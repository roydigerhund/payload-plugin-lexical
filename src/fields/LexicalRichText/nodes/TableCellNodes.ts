/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Klass, LexicalNode } from "lexical";

import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HashtagNode } from "@lexical/hashtag";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { AutoLinkNode, LinkNode } from "../plugins/LinkPlugin/LinkNodeModified";

import { AutocompleteNode } from "./AutocompleteNode";
import { ImageNode } from "./ImageNode";
import { KeywordNode } from "./KeywordNode";
import { MentionNode } from "./MentionNode";
import { EditorConfig } from "../../../types";

function TableCellNodes(editorConfig: EditorConfig): Array<Klass<LexicalNode>> {
  const nodes: Array<Klass<LexicalNode>> = [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    HashtagNode,
    CodeHighlightNode,
    AutoLinkNode,
    LinkNode,
    ImageNode,
    MentionNode,
    AutocompleteNode,
    KeywordNode,
  ];

  for (const feature of editorConfig.features) {
    if (feature.tableCellNodes && feature.tableCellNodes.length > 0) {
      for (const node of feature.tableCellNodes) {
        nodes.push(node);
      }
    }
  }

  return nodes;
}

export default TableCellNodes;
