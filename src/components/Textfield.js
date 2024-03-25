import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function Textfield({ onChange }) {

  const [orasPlecare, setOrasPlecare] = useState('');
  const [orasDestinatie, setOrasDestinatie] = useState('');
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '29ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Orasul de plecare"
          multiline
          maxRows={4}
          value={orasPlecare}
          onChange={(e) => setOrasPlecare(e.target.value)}
        />
        <TextField
          id="outlined-textarea"
          label="Orasul destinatie"
          multiline
          value={orasDestinatie}
          onChange={(e) => setOrasDestinatie(e.target.value)}
        />
      </div>
    </Box>
  );
}

export default Textfield;