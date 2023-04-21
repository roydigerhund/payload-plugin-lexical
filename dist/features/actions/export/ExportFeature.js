"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportFeature = void 0;
const React = __importStar(require("react"));
const LexicalComposerContext_1 = require("@lexical/react/LexicalComposerContext");
const file_1 = require("@lexical/file");
function ExportAction() {
    const [editor] = (0, LexicalComposerContext_1.useLexicalComposerContext)();
    return (React.createElement("button", { className: "action-button export", onClick: (event) => {
            event.preventDefault();
            (0, file_1.exportFile)(editor, {
                fileName: `Playground ${new Date().toISOString()}`,
                source: 'Playground',
            });
        }, title: "Export", "aria-label": "Export editor state to JSON" },
        React.createElement("i", { className: "export" })));
}
function ExportFeature(props) {
    return {
        actions: [React.createElement(ExportAction, { key: "export" })],
    };
}
exports.ExportFeature = ExportFeature;
//# sourceMappingURL=ExportFeature.js.map