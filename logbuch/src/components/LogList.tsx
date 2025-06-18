import { useState } from 'react';
import type { Log } from '../models/Log';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

type LogListProps = {
    logs: Log[];
    selectLog: (log: Log) => void;
};

export default function LogList({ logs, selectLog }: LogListProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    const handleListItemClick = (log: Log, index: number) => {
        selectLog(log);
        setSelectedIndex(index);
    };

    return (
        <Box sx={{
            width: '100%',
            bgcolor: 'background.paper',
            border: '1px solid #e0e0e0',
            overflow: 'hidden'
        }}>
            <List sx={{
                padding: 0,
                maxHeight: '100vh',
                overflow: 'auto'
            }}>
                {logs.map((log, index) => (
                    <Box key={log.id}>
                        <ListItemButton
                            selected={selectedIndex === index}
                            onClick={() => handleListItemClick(log, index)}
                        >
                            <ListItemText primary={
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: selectedIndex === index ? 'bold' : 'normal',
                                        color: selectedIndex === index ? 'primary.main' : 'text.primary'
                                    }}
                                >
                                    {log.filename}
                                </Typography>
                            }>
                                {log.filename}
                            </ListItemText>
                        </ListItemButton>
                        {index < logs.length - 1 && <Divider />}
                    </Box>
                ))}
            </List>
        </Box>
    );
}