import logo from './logo.svg';
import './App.css';
import Appbar from './components/Appbar'
import Textfield from './components/Textfield'
import CheckBox from './components/CheckBox'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DataField from './components/DataField'
import Box from '@mui/material/Box';
import Pasageri from './components/Pasageri'
import Buton from './components/Buton'
import React, { useState } from 'react';
import Bilet from './components/Bilet';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Bilet />
      </div>
    </LocalizationProvider>
  );
}

export default App;


