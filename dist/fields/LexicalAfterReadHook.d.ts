import { FieldHook } from 'payload/types';
import { SerializedEditorState, SerializedLexicalNode } from 'lexical';
type LexicalRichTextFieldAfterReadFieldHook = FieldHook<any, {
    jsonContent: SerializedEditorState;
    preview: string;
    characters: number;
    words: number;
}, any>;
export declare const populateLexicalRelationships: LexicalRichTextFieldAfterReadFieldHook;
export declare function traverseLexicalField(node: SerializedLexicalNode, locale: string, parentId?: string): Promise<SerializedLexicalNode>;
export {};
