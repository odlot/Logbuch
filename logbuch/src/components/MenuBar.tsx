import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CodeIcon from '@mui/icons-material/Code';

import { Editor } from '@tiptap/react';

type MenuBarProps = {
    editor: Editor;
};

export default function MenuBar({ editor }: MenuBarProps) {
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ButtonGroup variant="outlined" size="small">
                <Button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    variant={editor.isActive('codeBlock') ? 'contained' : 'outlined'}
                    title="Code Block"
                >
                    <CodeIcon fontSize="small" />
                </Button>
            </ButtonGroup>
        </Box>
    );
};