import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';

import { Editor } from '@tiptap/react';

type MenuBarProps = {
    editor: Editor;
};

export default function MenuBar({ editor }: MenuBarProps) {
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ButtonGroup variant="outlined" size="small">
                <Button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    variant={editor.isActive('bold') ? 'contained' : 'outlined'}
                    title="Bold"
                >
                    <FormatBoldIcon fontSize="small" />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    variant={editor.isActive('italic') ? 'contained' : 'outlined'}
                    title="Italic"
                >
                    <FormatItalicIcon fontSize="small" />
                </Button>
            </ButtonGroup>
        </Box>
    );
};