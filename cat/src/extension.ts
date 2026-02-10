// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cat" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);
		showExplanationMarkdown(selectedText);
	}
	const disposable = vscode.commands.registerCommand('cat.explainCode', async () => {
		
	});
	context.subscriptions.push(disposable);	
}

async function explainCodeInMarkdown(context: string): Promise<string> {
	const [model] = await vscode.lm.selectChatModels({family: 'gpt-4'});

	if (model) {
		const promtmessage = [
			vscode.LanguageModelChatMessage.User(`Analyze the following code and explain it shortly and compactly
				 step by step make it into in markdown format with code blocks that have the right language tag so the colors are right too.
				 devide it with lines between each step and make sure that i could easily make a screenshot of each step and make it into a powerpoint dont put anything else than the markdown content and make sure to use code blocks with the right language tag for the code snippets
				 :\n\n${context}`)
		];
		const response = await model.sendRequest(promtmessage);
		if (response) {
			return response.text.toString();
		}else{
			return "Sorry, I couldn't generate an explanation for the selected code.";
		}
	}else{
		return "Sorry, I couldn't find a suitable language model to generate the explanation.";
	}
}
async function showExplanationMarkdown(context: string) {
	const markdownContent = await explainCodeInMarkdown(context);
	const uri = vscode.Uri.parse(`untitled:explanation.md`)
	
	const doc = await vscode.workspace.openTextDocument(uri);
	const edit = new vscode.WorkspaceEdit();

	edit.insert(uri, new vscode.Position(0,0), markdownContent)
	await vscode.workspace.applyEdit(edit);

	await vscode.window.showTextDocument(doc, {preview: true, viewColumn: vscode.ViewColumn.Beside});
	await vscode.commands.executeCommand('markdown.showPreview', uri)
}
// This method is called when your extension is deactivated
export function deactivate() {}
