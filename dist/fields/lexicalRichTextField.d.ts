import { Field } from 'payload/types';
import { EditorConfig } from '../types';
import { FieldBase } from 'payload/dist/fields/config/types';
export declare function lexicalRichTextField(props: Omit<FieldBase, 'name'> & {
    name?: string;
    editorConfigModifier?: (defaultEditorConfig: EditorConfig) => EditorConfig;
}): Field;
