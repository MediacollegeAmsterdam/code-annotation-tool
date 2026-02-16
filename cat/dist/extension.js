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
const path = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(2));
const vscode = __importStar(__webpack_require__(3));
let currentPanel = undefined;
function activate(context) {
    const disposable = vscode.commands.registerCommand('cat.explainCode', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        const languageId = editor.document.languageId;
        if (selectedText) {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Generating Visual Explanation...",
                cancellable: false
            }, async () => {
                const markdown = await explainCodeInMarkdown(selectedText, languageId);
                if (currentPanel) {
                    // If panel exists, send a message to append a new step
                    currentPanel.reveal(vscode.ViewColumn.Active);
                    currentPanel.webview.postMessage({ type: 'newExplanation', content: markdown, language: languageId });
                }
                else {
                    // Otherwise, create the panel for the first time
                    showExplanationWebview(context, markdown, languageId);
                }
            });
        }
        else {
            vscode.window.showInformationMessage("Please select some code first!");
        }
    });
    context.subscriptions.push(disposable);
}
async function explainCodeInMarkdown(code, languageId) {
    try {
        const models = await vscode.lm.selectChatModels({ family: 'gpt-4' });
        const model = models[0] || (await vscode.lm.selectChatModels({}))[0];
        if (!model)
            return "No model available.";
        const prompt = [
            vscode.LanguageModelChatMessage.User(`Explain this code step-by-step for a beginner. 
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
                ${code}`)
        ];
        const response = await model.sendRequest(prompt);
        let fullText = '';
        for await (const fragment of response.text) {
            fullText += fragment;
        }
        return fullText;
    }
    catch (err) {
        console.error(err);
        return "### Error\n```javascript\n// Error generating explanation\n```\nCould not connect to AI.";
    }
}
function showExplanationWebview(context, initialContent, languageId) {
    currentPanel = vscode.window.createWebviewPanel('codeExplanation', 'Code Explanation Slides', vscode.ViewColumn.Active, {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'webview', 'dist')]
    });
    const htmlPath = path.join(context.extensionUri.fsPath, 'webview', 'dist', 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf-8');
    // Fix asset paths
    html = html.replace(/src="\/assets\/([^"]+)"/g, (match, filename) => {
        const fileUri = currentPanel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'webview', 'dist', 'assets', filename));
        return `src="${fileUri}"`;
    });
    console.log(languageId);
    // Inject Initial Data
    html = html.replace('</body>', `<script>window.markdownContent = ${JSON.stringify(initialContent)}; window.detectedLanguage = ${JSON.stringify(languageId)};</script></body>`);
    currentPanel.webview.html = html;
    currentPanel.onDidDispose(() => {
        currentPanel = undefined;
    }, null, context.subscriptions);
}
function deactivate() { }


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 3 */
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