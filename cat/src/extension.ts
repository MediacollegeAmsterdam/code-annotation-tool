import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

// Queue state for explanation requests
interface ExplanationRequest {
    code: string;
    languageId: string;
    timestamp: number;
}

let explanationQueue: ExplanationRequest[] = [];
let isProcessingQueue = false;
let currentPanel: vscode.WebviewPanel | undefined = undefined;

function enqueueRequest(code: string, languageId: string): void {
    explanationQueue.push({
        code,
        languageId,
        timestamp: Date.now()
    });
}

function dequeueRequest(): ExplanationRequest | undefined {
    return explanationQueue.shift();
}

async function processQueue(context: vscode.ExtensionContext): Promise<void> {
    // Prevent concurrent processing
    if (isProcessingQueue) {
        return;
    }
    
    isProcessingQueue = true;
    
    // Capture initial queue size for progress tracking
    const initialQueueSize = explanationQueue.length;
    let processedCount = 0;
    
    while (explanationQueue.length > 0) {
        const request = dequeueRequest();
        if (!request) break;
        
        processedCount++;
        const currentPosition = processedCount;
        const totalRequests = initialQueueSize;
        
        const title = totalRequests > 1 
            ? `Generating explanation ${currentPosition}/${totalRequests}...`
            : "Generating Visual Explanation...";
        
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title,
            cancellable: false
        }, async () => {
            const markdown = await explainCodeInMarkdown(request);
            
            if (currentPanel) {
                // If panel exists, send a message to append a new step
                currentPanel.reveal(vscode.ViewColumn.Active);
                currentPanel.webview.postMessage({ 
                    type: 'newExplanation', 
                    content: markdown, 
                    language: request.languageId 
                });
            } else {
                // Otherwise, create the panel for the first time
                showExplanationWebview(context, markdown, request.languageId);
            }
        });
    }
    
    isProcessingQueue = false;
}

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('cat.explainCode', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        const languageId = editor.document.languageId;

        if (selectedText) {
            // Enqueue the request with captured context
            enqueueRequest(selectedText, languageId);
            
            // Start processing the queue (no-op if already processing)
            processQueue(context);
        } else {
            vscode.window.showInformationMessage("Please select some code first!");
        }
    });

    context.subscriptions.push(disposable);
}

async function explainCodeInMarkdown(request: ExplanationRequest): Promise<string> {
    try {
        const models = await vscode.lm.selectChatModels({ family: 'gpt-4' }); 
        const model = models[0] || (await vscode.lm.selectChatModels({}))[0];

        if (!model) return "No model available.";

        const prompt = [
            vscode.LanguageModelChatMessage.User(
                `Explain this code step-by-step for a beginner. 
                Use Markdown. Each step should have one code block and one explanation.
                make sure there are no more codeblocks than explanations and no more explanations than codeblocks.
                The explanation should be concise and directly related to the code block.
                the explanations should never contain any bold or italic text, they should be straightforward and to the point and have no whitespace between them.
                The code should be broken down into logical sections, each with its own explanation.
                Do not include any additional commentary or information beyond the code and its explanation. 
                Format: 
                ### Title
                \`\`\`language
                code
                \`\`\`
                Explanation text here.
                
                Code:
                ${request.code}`
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

function showExplanationWebview(context: vscode.ExtensionContext, initialContent: string, languageId: string) {
    currentPanel = vscode.window.createWebviewPanel(
        'codeExplanation',
        'Code Explanation Slides',
        vscode.ViewColumn.Active,
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
    console.log(languageId);
    // Inject Initial Data
    html = html.replace(
        '</body>',
        `<script>window.markdownContent = ${JSON.stringify(initialContent)}; window.detectedLanguage = ${JSON.stringify(languageId)};</script></body>`
    );

    currentPanel.webview.html = html;

    currentPanel.onDidDispose(() => {
        currentPanel = undefined;
    }, null, context.subscriptions);
}

export function deactivate() {}