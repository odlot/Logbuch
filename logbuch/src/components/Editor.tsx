import { useEffect } from 'react';
import type { Log } from '../models/Log';
import Box from '@mui/material/Box';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import {
    convertLogToJSONContent,
    convertJSONContentToLog
} from '../adapters/Tiptap';

type EditorProps = {
    log?: Log,
    updateLog: (updatedLog: Log) => void;
};

const extensions = [StarterKit];

export default function Editor({ log, updateLog }: EditorProps) {
    const editor = useEditor({
        extensions,
        content: log ? convertLogToJSONContent(log) : '<p>Hello World!</p>',
        onUpdate: ({ editor }) => {
            if (log) {
                const content = editor.getJSON();
                console.log("JSONContent:", content);
                const updatedLog = convertJSONContentToLog(log, content);
                console.log("Updated log:", updatedLog);
                updateLog(updatedLog);
            }
        }
    });

    useEffect(() => {
        if (editor && log) {
            editor.commands.setContent(convertLogToJSONContent(log));
        } else if (editor && !log) {
            editor.commands.setContent('<p>Hello World!</p>');
        }
    }, [editor, log]);

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <EditorContent editor={editor} />
        </Box>
    );
}