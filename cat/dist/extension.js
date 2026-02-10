/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(__webpack_require__(1));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    console.log('Extension "cat" is now active!');
    // Register the command
    const disposable = vscode.commands.registerCommand('cat.explainCode', async () => {
        // Logic inside here runs EVERY time the command is triggered
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            if (selectedText) {
                await showExplanationMarkdown(selectedText);
            }
            else {
                vscode.window.showInformationMessage("Please select some code first!");
            }
        }
    });
    context.subscriptions.push(disposable);
}
async function explainCodeInMarkdown(context) {
    console.log("hello");
    const available = await vscode.lm.selectChatModels({});
    available.forEach(m => {
        console.log(`VENDOR: ${m.vendor} | FAMILY: ${m.family} | VERSION: ${m.version} | ID: ${m.id}`);
    });
    const config = vscode.workspace.getConfiguration('inlineChat');
    const defaultModel = config.get('defaultModel');
    console.log(defaultModel);
    const [model] = await vscode.lm.selectChatModels(available[4]);
    if (model) {
        const promtmessage = [
            vscode.LanguageModelChatMessage.User(`Analyze the following code and explain it shortly and compactly step by step. please do put some text in the explanation and make sure to make it readable to beginning programmers. also, make sure to
				  make it into in markdown format with code blocks that have the right language tag so the colors are right too.
				 devide it with lines between each step and make sure that i could easily make a screenshot of each step and make it into a powerpoint dont put anything else than the markdown content and make sure to use code blocks with the right language tag for the code snippets.
				 also make sure there arent any empty code blocks and that all code blocks have the right language tag for the code inside and that they wont show the 
				 :\n\n${context}`)
        ];
        try {
            const response = await model.sendRequest(promtmessage);
            if (response) {
                let fullText = '';
                // You must iterate through the fragments because .text is a stream
                for await (const fragment of response.text) {
                    fullText += fragment;
                }
                return fullText; // Now you have the complete string
            }
            else {
                return "Sorry, I couldn't generate an explanation for the selected code.";
            }
        }
        catch (err) {
            if (err instanceof vscode.LanguageModelError) {
                if (err.code === 'QuotaExceeded') { // This is the "Empty Tokens" check
                    return "### ⚠️ Subscription Limit Reached\nYou have run out of Copilot tokens for now. Please check your plan.";
                }
            }
            return "### ❌ Error\nAn unexpected error occurred.";
        }
    }
    else {
        return `Sorry, I couldn't find a suitable language model to generate the explanation. ${defaultModel}`;
    }
}
async function showExplanationMarkdown(context) {
    const markdownContent = await explainCodeInMarkdown(context);
    const uri = vscode.Uri.parse(`untitled:explanation.md`);
    const doc = await vscode.workspace.openTextDocument(uri);
    const edit = new vscode.WorkspaceEdit();
    edit.insert(uri, new vscode.Position(0, 0), markdownContent);
    await vscode.workspace.applyEdit(edit);
    await vscode.window.showTextDocument(doc, { preview: true, viewColumn: vscode.ViewColumn.Beside });
    await vscode.commands.executeCommand('markdown.showPreview', uri);
}
// This method is called when your extension is deactivated
function deactivate() { }


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map