# Payload Lexical Plugin ![GitHub Repo stars](https://img.shields.io/github/stars/AlessioGr/payload-plugin-lexical?label=Star%20this%20plugin%20%3C3&style=social)

![npm](https://img.shields.io/npm/v/payload-plugin-lexical?style=flat)
![npm](https://img.shields.io/npm/dt/payload-plugin-lexical?style=flat)
![NPM](https://img.shields.io/npm/l/payload-plugin-lexical)

A plugin for [Payload CMS](https://github.com/payloadcms/payload) whichs adds a [lexical](https://lexical.dev/)-based richtext editor. Lexical is a lot nicer to use than Slate & more modern - it's also maintained by Meta.

This plugin already comes packed with a ton of features which the original editor doesn't have (from tables & markdown to stuff like speech-to-tech) - all customizable. It's also a lot easier to extend this editor and add new stuff to it!

## Installation / How to use

Install the plugin using `yarn add payload-plugin-lexical`. You can find examples of how to use it below.

**Minimum required payload version: 1.6.32**

## Screenshots

![203127349-2be29de4-aff3-4e13-9ebe-56be5fc3fc97 (1)](https://user-images.githubusercontent.com/70709113/204068103-a09f39e1-14e4-45fc-868a-68558380b74e.png)
![203127640-caa1f279-1555-48e6-9465-8c441ea65149](https://user-images.githubusercontent.com/70709113/204068104-8dcf337a-b18e-47b8-8ba3-3e777a1f834c.png)

### How I'm using it in production - customized & with some features turned on or off:

![Arc 2023-03-20 at 01 34 05@2x](https://user-images.githubusercontent.com/70709113/226221050-f411c82c-6a66-49d0-94ef-1a7e9c1fdd22.jpg)

https://user-images.githubusercontent.com/70709113/226221855-08e2efe3-3624-45a1-9ad2-8ff5cddbc843.mp4

## Example - Basic

payload.config.ts:

```ts
import { buildConfig } from 'payload/config';
import { LexicalPlugin } from "payload-plugin-lexical";

export default buildConfig({
  ...
  plugins: [
    LexicalPlugin({
      // Only set this if you want to use the the AISuggest Feature
      ai: {
        openai_key: process.env.OPENAI_KEY,
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});

```

Collection config:

```ts
import { CollectionConfig } from 'payload/types';
import { lexicalRichTextField } from 'payload-plugin-lexical';

const Lexical: CollectionConfig = {
  slug: 'lexicalRichText',
  admin: {
    useAsTitle: 'title',
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
    }),
  ],
};

export default Lexical;
```

## Example - more customization and own, custom node:

```ts
import { CollectionConfig } from 'payload/types';
import {
  lexicalRichTextField,
  EquationsFeature,
  EmojisFeature,
  EmojiPickerFeature,
  HorizontalRuleFeature,
  FigmaFeature,
  YouTubeFeature,
  TwitterFeature,
  SpeechToTextFeature,
  ImportFeature,
  ExportFeature,
  ClearEditorFeature,
  ReadOnlyModeFeature,
  ConvertFromMarkdownFeature,
  MentionsFeature,
  TreeViewFeature,
  KeywordsFeature,
  AutoCompleteFeature,
  CollapsibleFeature,
  TypingPerfFeature,
  PasteLogFeature,
  TestRecorderFeature,
  LinkFeature,
  TableOfContentsFeature,
  AISuggestFeature,
} from 'payload-plugin-lexical';

const Lexical: CollectionConfig = {
  slug: 'lexicalRichText',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    lexicalRichTextField({
      name: 'lexicalRichTextEditor',
      label: 'cool richtext editor',
      localized: true,
      editorConfigModifier: (defaultEditorConfig) => {
        defaultEditorConfig.debug = false;
        defaultEditorConfig.toggles.textColor.enabled = false;
        defaultEditorConfig.toggles.textBackground.enabled = false;
        defaultEditorConfig.toggles.fontSize.enabled = false;
        defaultEditorConfig.toggles.font.enabled = false;
        defaultEditorConfig.toggles.align.enabled = false;
        defaultEditorConfig.toggles.tables.enabled = true;
        defaultEditorConfig.toggles.tables.display = false;

        // Optional: these are the default features. Feel free to customize them or remove the ones you do not like!
        defaultEditorConfig.features = [
          EquationsFeature({}), // LaTex (well KaTeX) equations
          EmojisFeature({}), // Adds new Emoji nodes with new, different-looking emojis
          EmojiPickerFeature({}), // Use in combination with EmojisPlugin. When you start typing ":" it will show you different emojis you can use. They also look different!
          HorizontalRuleFeature({}), // Horizontal rule in the editor.
          FigmaFeature({}), // Figma Embed
          YouTubeFeature({}), // YouTube Embed
          TwitterFeature({}), // Twitter Embed
          SpeechToTextFeature({}), // Adds a Speech-to-text button in the Actions menu (bottom right of the editor). When you click on it and speak, it converts the speech into text
          ImportFeature({}), // Acion button: import
          ExportFeature({}), // Acion button: export
          ClearEditorFeature({}), // Adds a button in the action menu which clears the editor
          ReadOnlyModeFeature({}), // Acion button: toggle read-only mode on or off
          ConvertFromMarkdownFeature({}), // Acion button: convert from markdown
          MentionsFeature({}), // Ability to mention someone when you type "@"
          TreeViewFeature({ enabled: defaultEditorConfig.debug }), // If enabled, will show the node representation of the editor under the editor. Good for debugging
          KeywordsFeature({}), // Highlights certain words
          AutoCompleteFeature({}), // Autocompletes certain words while typing
          CollapsibleFeature({}), // Adds a "collapsible" node
          TypingPerfFeature({ enabled: defaultEditorConfig.debug }), // Some debug tool for performance testing
          PasteLogFeature({ enabled: defaultEditorConfig.debug }), // Another debug tool
          TestRecorderFeature({ enabled: defaultEditorConfig.debug }), // Another debug tool used for lexical core development, with which you can automatically generate tests
          LinkFeature({}), // Obvious: hyperlinks! This includes the AutoLink plugin.
          TableOfContentsFeature({ enabled: false }), // Shows a table of contents on the right hand-side of the screen
          AISuggestFeature({}), // Make sure you set your openai key in the plugin config to be able to use it
        ];

        // A feature can consist of nodes, plugins, modals, toolbar elements and more! YourOwnCustomFeature must be of type "Feature"
        defaultEditorConfig.features.push(YourOwnCustomFeature({}));

        return defaultEditorConfig;
      },
    }),
  ],
};

export default Lexical;
```

This example can also be found in the demo!

## Serializing

Feel free to use my serializer in the [serialize-example](https://github.com/AlessioGr/payload-plugin-lexical/tree/master/serialize-example) folder of this repo. Lexical is using bitwise operations for the node formats.

This currently serialized the most important stuff, but not everything. Feel free to contribute to it if you add more!

## Idea list:

- [x] Update slash commands to reflect the toolbar
- [x] Add wordcount, charactercount & preview to the json output
- [x] Commenting functionality
- [x] Upload plugin/node captions
- [ ] Ability to add custom fields to uploads like captions
- [ ] (relationship node?)
- [x] Fix internal collection search for internal link editor
- [ ] Edit Upload Button
- [ ] Improve design & UX of links. For example, clicking on the link button should open the link drawer immediately
- [ ] (maybe?) lazy loading lexical editor to reduce load times. or maybe just the images?
- [ ] New format/node: "highlight"/"mark" (WILL BE ADDED NATIVELY BY LEXICAL IN 0.7.8)
- [x] Increase customizability & DX. Plugins should all be set in the config. Slash commands & Toolbar items should come from the same place.
- [ ] Add ExcaliDraw
- [x] Take a closer look at AutoLink. Is it necessary and what does it do?
- [x] Make extranodes, extraplugins ... config options hold the ENTIRE nodes, and rename to just "nodes" and "plugins". Makes it easier to remove them and start from scratch, or to insert one at a special position, instead of just pushing it to the end. Especially useful for the Toolbar plugin.
- [x] extraFloatingToolbarElements
- [ ] Implement [Table Cell Background Color PR](https://github.com/facebook/lexical/commit/6a239b6ae1807e9dae1b434482b5ecd9513e77fa#diff-72b3aff11ff90536142b8a0276cfaabb008ba453bea2f992f7fdb173a8d1c516)

## Updating lexical

Since this is based on their playground, you gotta upstream their changes. Then, the following is additionally copied over outside of the playground package - needs to be considered in lexical updates as well:

- https://github.com/facebook/lexical/blob/main/packages/lexical-react/src/LexicalOnChangePlugin.ts
- https://github.com/facebook/lexical/blob/main/packages/lexical-react/src/LexicalLinkPlugin.ts
- https://github.com/facebook/lexical/blob/main/packages/lexical-react/src/LexicalAutoLinkPlugin.ts
- https://github.com/facebook/lexical/tree/main/packages/shared
- https://github.com/facebook/lexical/blob/main/packages/lexical-link/src/index.ts
- And of course their playground package
