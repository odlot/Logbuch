import { useEffect } from 'react';
import type { Log } from '../models/Log';
import Box from '@mui/material/Box';

import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import CodeBlock from '@tiptap/extension-code-block';

import {
    convertLogToJSONContent,
    convertJSONContentToLog
} from '../adapters/Tiptap';

import { Note } from '../extensions/Note';

import './Editor.css';

import MenuBar from './MenuBar';

type EditorProps = {
    log?: Log,
    updateLog: (updatedLog: Log) => void;
};

const extensions = [
    Document,
    Text,
    Heading,
    CodeBlock,
    Note
];

export default function Editor({ log, updateLog }: EditorProps) {
    const editor = useEditor({
        extensions,
        content: log ? convertLogToJSONContent(log) : '<div class="note">Hello World!</div>',
        onUpdate: ({ editor }) => {
            if (log) {
                const content = editor.getJSON();
                console.log("JSONContent:", content);
                const updatedLog = convertJSONContentToLog(log, content);
                console.log("Updated log:", updatedLog);
                updateLog(updatedLog);
            }
        },
        editorProps: {
            attributes: {
                class: 'custom-editor',
            },
        },
    });

    useEffect(() => {
        if (editor && log) {
            editor.commands.setContent(convertLogToJSONContent(log));
        } else if (editor && !log) {
            editor.commands.setContent('<div class="note">Hello World!</div>');
        }
    }, [editor, log]);

    return (
        <Box sx={{
            width: '100%',
            bgcolor: 'background.paper',
            border: '1px solid #e0e0e0',
        }}>
            <MenuBar editor={editor}/>
            <EditorContent editor={editor}/>
        </Box>
    );
}