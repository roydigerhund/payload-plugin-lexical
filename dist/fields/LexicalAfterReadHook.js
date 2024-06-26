"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseLexicalField = exports.populateLexicalRelationships = void 0;
const PayloadLexicalRichTextFieldComponent_1 = require("./LexicalRichText/PayloadLexicalRichTextFieldComponent");
const payload_1 = __importDefault(require("payload"));
const populateLexicalRelationships = ({ value, req, data, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!value) {
        return value;
    }
    const jsonContent = (0, PayloadLexicalRichTextFieldComponent_1.getJsonContentFromValue)(value);
    if (jsonContent && jsonContent.root && jsonContent.root.children) {
        const newChildren = [];
        for (let childNode of jsonContent.root.children) {
            newChildren.push(yield traverseLexicalField(childNode, ''));
        }
        jsonContent.root.children = newChildren;
    }
    value.jsonContent = Object.assign({}, jsonContent);
    return value;
});
exports.populateLexicalRelationships = populateLexicalRelationships;
function loadUploadData(rawImagePayload, locale) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield payload_1.default.findByID({
                collection: rawImagePayload.relationTo,
                id: rawImagePayload.value.id,
                depth: 1,
                locale: locale,
            });
        }
        catch (e) {
            console.log('Error loading upload data', e);
            return null;
        }
    });
}
function loadInternalLinkDocData(value, relationTo, locale) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield payload_1.default.findByID({
                collection: relationTo,
                id: value,
                depth: 1,
                locale: locale,
                user: 'link-relation',
                overrideAccess: false,
            });
        }
        catch (e) {
            console.log('Error loading internal link doc data', e);
            return null;
        }
    });
}
function traverseLexicalField(node, locale) {
    return __awaiter(this, void 0, void 0, function* () {
        //Find replacements
        if (node.type === 'upload') {
            const rawImagePayload = node['rawImagePayload'];
            //const extraAttributes: ExtraAttributes = node["extraAttributes"];
            const uploadData = yield loadUploadData(rawImagePayload, locale);
            if (uploadData) {
                node['data'] = uploadData;
            }
        }
        else if (node.type === 'link' &&
            node['attributes']['linkType'] &&
            node['attributes']['linkType'] === 'internal') {
            const doc = node['attributes']['doc'];
            if (!doc) {
                return node;
            }
            const foundDoc = yield loadInternalLinkDocData(doc.value, doc.relationTo, locale);
            if (foundDoc) {
                node['attributes']['doc']['data'] = foundDoc;
            }
        }
        //Run for its children
        if (node['children'] && node['children'].length > 0) {
            let newChildren = [];
            for (let childNode of node['children']) {
                newChildren.push(yield traverseLexicalField(childNode, locale));
            }
            node['children'] = newChildren;
        }
        return node;
    });
}
exports.traverseLexicalField = traverseLexicalField;
//# sourceMappingURL=LexicalAfterReadHook.js.map