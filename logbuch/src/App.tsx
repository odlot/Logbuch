import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <LogList logs={logs} selectLog={setSelectedLog} />
        </Grid>
        <Grid size={8}>
          <Editor log={selectedLog} updateLog={handleLogUpdate} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
