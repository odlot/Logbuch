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
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <List>
                {logs.map(log => (
                    <ListItemButton
                        key={log.id}
                        onClick={() => selectLog(log)}
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