import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

import LogList from './components/LogList';
import type { Log } from './models/Log';
import { Logs } from './mocks/Logs';

import Editor from './components/Editor';

function App() {
  const [logs, setLogs] = useState<Log[]>(Logs);
  const [selectedLog, setSelectedLog] = useState<Log | undefined>(undefined);

  const handleLogUpdate = (updatedLog: Log) => {
    setLogs(previousLogs =>
      previousLogs.map(log => log.id === updatedLog.id ? updatedLog : log)
    );
  };

  const handleAddLog = () => {
    const log: Log = {
      id: crypto.randomUUID(),
      filename: "Untitled Log",
      createdAt: new Date().toISOString(),
      notes: []
    };
    setLogs(logs => [...logs, log]);
    setSelectedLog(log);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={2}>
          <Stack spacing={2}>
            <Button
              variant="contained"
              startIcon={<NoteAddOutlinedIcon />}
              onClick={handleAddLog}
            >
              Add Log
            </Button>
            <LogList logs={logs} selectLog={setSelectedLog} />
          </Stack>
        </Grid>
        <Grid size={10}>
          <Editor log={selectedLog} updateLog={handleLogUpdate} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
