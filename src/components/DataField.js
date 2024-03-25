import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';

export default function DateFields() {
  const [selectedDate1, setSelectedDate1] = React.useState(null);
  const [selectedDate2, setSelectedDate2] = React.useState(null);

  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" justifyContent="center">
        <DatePicker
          value={selectedDate1}
          onChange={handleDateChange1}
        />
        <Box marginLeft={2}>
          {/* Adaugă spațiu între cele două componente */}
        </Box>
        <DatePicker
          value={selectedDate2}
          onChange={handleDateChange2}
        />
      </Box>
    </LocalizationProvider>
  );
}