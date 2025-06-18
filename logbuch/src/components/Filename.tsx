import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import type { Log } from '../models/Log';

type FilenameProps = {
    log?: Log;
    changeFilename: (filename: string) => void;
};

export default function Filename({ log, changeFilename }: FilenameProps) {
    const [filename, setFilename] = useState('');

    useEffect(() => {
        if (log) {
            setFilename(log.filename);
        } else {
            setFilename('');
        }
    }, [log]);

    const handleFilenameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilename(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            saveFilename();
        } else if (event.key === 'Escape') {
            cancelEdit();
        }
    };

    const saveFilename = () => {
        if (log && filename.trim() !== '') {
            changeFilename(filename);
        }
    };

    const cancelEdit = () => {
        if (log) {
            setFilename(log.filename);
        }
    };

    return (
        <Box sx={{ py: 1 }}>
            <TextField
                fullWidth
                value={filename}
                onChange={handleFilenameChange}
                onKeyDown={handleKeyDown}
                onBlur={saveFilename}
            />
        </Box>
    );
}