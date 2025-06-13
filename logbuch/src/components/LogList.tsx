import { useState } from 'react';
import type { Log } from '../models/Log';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from '@mui/material/ListItemText';

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
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <List>
                {logs.map((log, index) => (
                    <ListItemButton
                        key={log.id}
                        selected={selectedIndex === index}
                        onClick={() => handleListItemClick(log, index)}
                    >
                        <ListItemText>
                            {log.filename}
                        </ListItemText>
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}