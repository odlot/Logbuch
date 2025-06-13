import type { Log } from '../models/Log';
import Box from '@mui/material/Box';

type EditorProps = {
    log?: Log
};

export default function Editor({ log }: EditorProps) {
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {log ? (
                <div>
                    {log.filename}
                </div>
            ) : (
                <div>
                    Editor
                </div>
            )}
        </Box>
    );
}