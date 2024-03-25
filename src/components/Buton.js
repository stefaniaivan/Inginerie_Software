import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';



export default function IconLabelButtons() {
  return (
    <Box display="flex" justifyContent="center">
    <Stack direction="row" spacing={2}>
      <Button variant="contained" endIcon={<SendIcon />}>
        Cauta acum
      </Button>
    </Stack>
    </Box>
  );
}