import { CollectionConfig } from 'payload/types';
import { lexicalRichTextField } from '../../../src/fields/lexicalRichTextField';
//import lexicalRichTextField from '../../../dist/fields/lexicalRichTextField'

const LexicalTable: CollectionConfig = {
  slug: 'lexicalRichTextTable',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    lexicalRichTextField({
      name: 'lexicalRichTextEditor',
      label: 'Lexical Rich Text Editor',
      required: true,
      admin: {
        readOnly: false,
      },
      editorConfigModifier: (defaultEditorConfig) => {
        defaultEditorConfig.debug = false;
        defaultEditorConfig.toggles.textColor.enabled = false;
        defaultEditorConfig.toggles.textBackground.enabled = false;
        defaultEditorConfig.toggles.fontSize.enabled = false;
        defaultEditorConfig.toggles.font.enabled = false;
        defaultEditorConfig.toggles.align.enabled = true;
        defaultEditorConfig.toggles.tables.enabled = true;
        defaultEditorConfig.toggles.tables.display = true;
        defaultEditorConfig.toggles.comments.enabled = false;
        defaultEditorConfig.toggles.upload.enabled = true;

        defaultEditorConfig.toggles.blocks = [];

        return defaultEditorConfig;
      },
    }),
  ],
};

export default LexicalTable;
