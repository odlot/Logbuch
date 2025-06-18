import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Typography from '@mui/material/Typography';

import type { Log } from '../models/Log';

type MetadataProps = {
    log?: Log;
};

export default function Metadata({ log }: MetadataProps) {
    return (
        <Box>
            <Stack direction="row" spacing={1}>
                <AccessTimeIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                    {log?.createdAt}
                </Typography>
            </Stack>
        </Box>
    );
};