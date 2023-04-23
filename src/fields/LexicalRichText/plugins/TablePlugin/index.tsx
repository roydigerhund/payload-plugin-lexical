/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import './modal.scss';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import {
  $insertNodes,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  EditorThemeClasses,
  Klass,
  LexicalCommand,
  LexicalEditor,
  LexicalNode,
} from 'lexical';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import invariant from '../../shared/invariant';

import {
  $createTableNodeWithDimensions,
  TableNode,
} from '../../nodes/TableNode';
import Button from 'payload/dist/admin/components/elements/Button';
import { DialogActions } from '../../ui/Dialog';
import TextInput from '../../ui/TextInput';
import { useEditDepth } from 'payload/dist/admin/components/utilities/EditDepth';
import {
  Drawer,
  formatDrawerSlug,
} from 'payload/dist/admin/components/elements/Drawer';
import { useModal } from '@faceless-ui/modal';
import { Gutter } from 'payload/dist/admin/components/elements/Gutter';
import X from 'payload/dist/admin/components/icons/X';
import { useEditorConfigContext } from '../../LexicalEditorComponent';

export type InsertTableCommandPayload = Readonly<{
  columns: string;
  rows: string;
  includeHeaders?: boolean;
}>;

export type CellContextShape = {
  cellEditorConfig: null | CellEditorConfig;
  cellEditorPlugins: null | JSX.Element | Array<JSX.Element>;
  set: (
    cellEditorConfig: null | CellEditorConfig,
    cellEditorPlugins: null | JSX.Element | Array<JSX.Element>,
  ) => void;
};

export type CellEditorConfig = Readonly<{
  namespace: string;
  nodes?: ReadonlyArray<Klass<LexicalNode>>;
  onError: (error: Error, editor: LexicalEditor) => void;
  readOnly?: boolean;
  theme?: EditorThemeClasses;
}>;

export const INSERT_NEW_TABLE_COMMAND: LexicalCommand<InsertTableCommandPayload> =
  createCommand('INSERT_NEW_TABLE_COMMAND');

export const CellContext = createContext<CellContextShape>({
  cellEditorConfig: null,
  cellEditorPlugins: null,
  set: () => {
    // Empty
  },
});

export function TableContext({ children }: { children: JSX.Element }) {
  const [contextValue, setContextValue] = useState<{
    cellEditorConfig: null | CellEditorConfig;
    cellEditorPlugins: null | JSX.Element | Array<JSX.Element>;
  }>({
    cellEditorConfig: null,
    cellEditorPlugins: null,
  });
  return (
    <CellContext.Provider
      value={useMemo(
        () => ({
          cellEditorConfig: contextValue.cellEditorConfig,
          cellEditorPlugins: contextValue.cellEditorPlugins,
          set: (cellEditorConfig, cellEditorPlugins) => {
            setContextValue({ cellEditorConfig, cellEditorPlugins });
          },
        }),
        [contextValue.cellEditorConfig, contextValue.cellEditorPlugins],
      )}>
      {children}
    </CellContext.Provider>
  );
}

const baseClass = 'rich-text-table-modal';

export function InsertTableDialog({}: {}): JSX.Element {
  const { uuid } = useEditorConfigContext();

  const editDepth = useEditDepth();
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const tableDrawerSlug = formatDrawerSlug({
    slug: `lexicalRichText-add-table` + uuid,
    depth: editDepth,
  });
  const { toggleModal, closeModal } = useModal();

  const [rows, setRows] = useState('5');
  const [columns, setColumns] = useState('5');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const row = Number(rows);
    const column = Number(columns);
    if (row && row > 0 && row <= 500 && column && column > 0 && column <= 50) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [rows, columns]);

  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns,
      rows,
    });

    closeModal(tableDrawerSlug);
  };

  return (
    <Drawer
      slug={tableDrawerSlug}
      key={tableDrawerSlug}
      className={baseClass}
      title="Add table">
      <React.Fragment>
        <TextInput
          placeholder={'# of rows (1-500)'}
          label="Rows"
          onChange={setRows}
          value={rows}
          data-test-id="table-modal-rows"
          type="number"
        />
        <TextInput
          placeholder={'# of columns (1-50)'}
          label="Columns"
          onChange={setColumns}
          value={columns}
          data-test-id="table-modal-columns"
          type="number"
        />
        <DialogActions data-test-id="table-model-confirm-insert">
          <Button disabled={isDisabled} onClick={onClick}>
            Confirm
          </Button>
        </DialogActions>
      </React.Fragment>
    </Drawer>
  );
}

export function InsertNewTableDialog({}: {}): JSX.Element {
  const { uuid } = useEditorConfigContext();

  const editDepth = useEditDepth();
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const newTableDrawerSlug = formatDrawerSlug({
    slug: `lexicalRichText-add-newtable` + uuid,
    depth: editDepth,
  });
  const { toggleModal, closeModal } = useModal();

  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const row = Number(rows);
    const column = Number(columns);
    if (row && row > 0 && row <= 500 && column && column > 0 && column <= 50) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [rows, columns]);

  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_NEW_TABLE_COMMAND, { columns, rows });
    closeModal(newTableDrawerSlug);
  };

  return (
    <Drawer
      slug={newTableDrawerSlug}
      key={newTableDrawerSlug}
      className={baseClass}
      title="Add new table">
      <React.Fragment>
        <TextInput
          placeholder={'# of rows (1-500)'}
          label="Rows"
          onChange={setRows}
          value={rows}
          data-test-id="table-modal-rows"
          type="number"
          defaultValue="3"
        />
        <TextInput
          placeholder={'# of columns (1-50)'}
          label="Columns"
          onChange={setColumns}
          value={columns}
          data-test-id="table-modal-columns"
          type="number"
          defaultValue="3"
        />
        <DialogActions data-test-id="table-modal-confirm-insert">
          <Button disabled={isDisabled} onClick={onClick}>
            Confirm
          </Button>
        </DialogActions>
      </React.Fragment>
    </Drawer>
  );
}

export function TablePlugin({
  cellEditorConfig,
  children,
}: {
  cellEditorConfig: CellEditorConfig;
  children: JSX.Element | Array<JSX.Element>;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const cellContext = useContext(CellContext);

  useEffect(() => {
    if (!editor.hasNodes([TableNode])) {
      invariant(false, 'TablePlugin: TableNode is not registered on editor');
    }

    cellContext.set(cellEditorConfig, children);

    return editor.registerCommand<InsertTableCommandPayload>(
      INSERT_NEW_TABLE_COMMAND,
      ({ columns, rows, includeHeaders }) => {
        const tableNode = $createTableNodeWithDimensions(
          Number(rows),
          Number(columns),
          includeHeaders,
        );
        $insertNodes([tableNode]);

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [cellContext, cellEditorConfig, children, editor]);

  return null;
}
