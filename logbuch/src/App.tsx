import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

import LogList from './components/LogList';
import type { Log } from './models/Log';
import { Logs } from './mocks/Logs';

import Filename from './components/Filename';
import Metadata from './components/Metadata';
import Editor from './components/Editor';

function App() {
  const [logs, setLogs] = useState<Log[]>(Logs);
  const [selectedLog, setSelectedLog] = useState<Log | undefined>(undefined);

  const handleLogUpdate = (updatedLog: Log) => {
    setLogs(previousLogs =>
      previousLogs.map(log => log.id === updatedLog.id ? updatedLog : log)
    );
  };

  const handleFilenameChange = (filename: string) => {
    if (selectedLog) {
      const log = {
        ...selectedLog,
        filename: filename
      };
      handleLogUpdate(log);
    }
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

  const handleOpenDirectory = () => {

  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={2}>
          <Stack spacing={2}>
            <Box>
              <ButtonGroup variant="outlined" size="small">
                <Button
                  variant="contained"
                  startIcon={<FolderOpenIcon />}
                  onClick={handleOpenDirectory}
                >
                  Open Directory
                </Button>
                <Button
                  variant="contained"
                  startIcon={<NoteAddOutlinedIcon />}
                  onClick={handleAddLog}
                >
                  Add Log
                </Button>
              </ButtonGroup>
            </Box>
            <LogList logs={logs} selectLog={setSelectedLog} />
          </Stack>
        </Grid>
        <Grid size={10}>
          <Stack spacing={2}>
            <Filename log={selectedLog} changeFilename={handleFilenameChange} />
            <Metadata log={selectedLog} />
            <Editor log={selectedLog} updateLog={handleLogUpdate} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
