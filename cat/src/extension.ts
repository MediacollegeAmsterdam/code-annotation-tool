import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

let currentPanel: vscode.WebviewPanel | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('cat.explainCode', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        if (selectedText) {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Generating Visual Explanation...",
                cancellable: false
            }, async () => {
                const markdown = await explainCodeInMarkdown(selectedText);
                
                if (currentPanel) {
                    // If panel exists, send a message to append a new step
                    currentPanel.reveal(vscode.ViewColumn.Active);
                    currentPanel.webview.postMessage({ type: 'newExplanation', content: markdown });
                } else {
                    // Otherwise, create the panel for the first time
                    showExplanationWebview(context, markdown);
                }
            });
        } else {
            vscode.window.showInformationMessage("Please select some code first!");
        }
    });

    context.subscriptions.push(disposable);
}

async function explainCodeInMarkdown(code: string): Promise<string> {
    try {
        const models = await vscode.lm.selectChatModels({ family: 'gpt-4' }); 
        const model = models[0] || (await vscode.lm.selectChatModels({}))[0];

        if (!model) return "No model available.";

        const prompt = [
            vscode.LanguageModelChatMessage.User(
                `Explain this code step-by-step for a beginner. 
                Use Markdown. Each step should have one code block and one explanation.
                Format: 
                ### Title
                \`\`\`language
                code
                \`\`\`
                Explanation text here.
                
                Code:
                ${code}`
            )
        ];

        const response = await model.sendRequest(prompt);
        let fullText = '';
        for await (const fragment of response.text) {
            fullText += fragment;
        }
        return fullText;
    } catch (err) {
        console.error(err);
        return "### Error\n```javascript\n// Error generating explanation\n```\nCould not connect to AI.";
    }
}

function showExplanationWebview(context: vscode.ExtensionContext, initialContent: string) {
    currentPanel = vscode.window.createWebviewPanel(
        'codeExplanation',
        'Code Explanation Slides',
        vscode.ViewColumn.Beside,
        {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'webview', 'dist')]
        }
    );

    const htmlPath = path.join(context.extensionUri.fsPath, 'webview', 'dist', 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf-8');

    // Fix asset paths
    html = html.replace(/src="\/assets\/([^"]+)"/g, (match, filename) => {
        const fileUri = currentPanel!.webview.asWebviewUri(
            vscode.Uri.joinPath(context.extensionUri, 'webview', 'dist', 'assets', filename)
        );
        return `src="${fileUri}"`;
    });

    // Inject Initial Data
    html = html.replace(
        '</body>',
        `<script>window.markdownContent = ${JSON.stringify(initialContent)};</script></body>`
    );

    currentPanel.webview.html = html;

    currentPanel.onDidDispose(() => {
        currentPanel = undefined;
    }, null, context.subscriptions);
}

export function deactivate() {}