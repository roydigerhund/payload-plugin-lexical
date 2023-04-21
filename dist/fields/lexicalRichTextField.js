"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lexicalRichTextField = void 0;
const LexicalRichText_1 = require("./LexicalRichText");
const types_1 = require("../types");
const LexicalAfterReadHook_1 = require("./LexicalAfterReadHook");
const lodash_1 = require("lodash");
function lexicalRichTextField(props) {
    const { name, label, editorConfigModifier } = props;
    const defaultEditorConfigCloned = (0, lodash_1.cloneDeep)(types_1.defaultEditorConfig);
    const finalEditorConfig = !editorConfigModifier
        ? defaultEditorConfigCloned
        : editorConfigModifier(defaultEditorConfigCloned);
    if (props === null || props === void 0 ? void 0 : props.editorConfigModifier) {
        delete props.editorConfigModifier;
    }
    return Object.assign(Object.assign({ name: name ? name : 'richText', type: 'richText', label: label ? label : 'Rich Text' }, props), { hooks: Object.assign(Object.assign({}, props.hooks), { afterRead: [LexicalAfterReadHook_1.populateLexicalRelationships] }), admin: Object.assign(Object.assign({}, props.admin), { components: {
                Field: (args) => (0, LexicalRichText_1.LexicalRichTextFieldComponent)(Object.assign(Object.assign({}, args), { editorConfig: finalEditorConfig })),
                Cell: (args) => (0, LexicalRichText_1.LexicalRichTextCell)(Object.assign(Object.assign({}, args), { editorConfig: finalEditorConfig })),
            } }) });
}
exports.lexicalRichTextField = lexicalRichTextField;
//# sourceMappingURL=lexicalRichTextField.js.map