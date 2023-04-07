import { CollectionConfig } from 'payload/types';
import { lexicalRichTextField } from '../../../src/fields/lexicalRichTextField';
//import lexicalRichTextField from '../../../dist/fields/lexicalRichTextField'

const Lexical: CollectionConfig = {
  slug: 'lexicalRichText',
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
    }),
  ],
};

export default Lexical;
