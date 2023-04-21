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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoCompleteFeature = void 0;
const React = __importStar(require("react"));
const plugins_1 = __importDefault(require("./plugins"));
const AutocompleteNode_1 = require("./nodes/AutocompleteNode");
function AutoCompleteFeature(props) {
    return {
        plugins: [
            {
                component: React.createElement(plugins_1.default, { key: "autocomplete" }),
            },
        ],
        nodes: [AutocompleteNode_1.AutocompleteNode],
        tableCellNodes: [AutocompleteNode_1.AutocompleteNode],
    };
}
exports.AutoCompleteFeature = AutoCompleteFeature;
//# sourceMappingURL=AutoCompleteFeature.js.map