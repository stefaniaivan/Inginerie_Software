import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

export default function Checkboxes() {
  const [checkedDus, setCheckedDus] = React.useState(true);
  const [checkedDusIntors, setCheckedDusIntors] = React.useState(false);

  const handleCheckboxChange = (event) => {
    if (event.target.name === 'dus') {
      setCheckedDus(event.target.checked);
      setCheckedDusIntors(!event.target.checked);
    } else if (event.target.name === 'dusIntors') {
      setCheckedDusIntors(event.target.checked);
      setCheckedDus(!event.target.checked);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox name="dus" checked={checkedDus} onChange={handleCheckboxChange} inputProps={{ 'aria-label': 'Dus checkbox' }} />}
          label="Dus"
        />
        <FormControlLabel
          control={<Checkbox name="dusIntors" checked={checkedDusIntors} onChange={handleCheckboxChange} inputProps={{ 'aria-label': 'Dus-intors checkbox' }} />}
          label="Dus-intors*"
        />
      </FormGroup>
    </Box>
  );
}