import React, { useEffect, useState } from 'react';
import Appbar from './Appbar';
import CheckBox from './CheckBox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Paper,Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { unstable_useNumberInput as useNumberInput } from '@mui/base/unstable_useNumberInput';
import { styled } from '@mui/system';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';

function Bilet() {
  const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
  const [orasPlecare, setOrasPlecare] = useState('');
  const [orasDestinatie, setOrasDestinatie] = useState('');
  const [selectedDate1, setSelectedDate1] = React.useState(null);
  const [selectedDate2, setSelectedDate2] = React.useState(null);
  const [pasageri, setPasageri] = React.useState(0);
  const [bilete, setBilete] = useState([]);
  const [rezervare, setRezervare] = React.useState(null);
  const [pasageriNames, setPasageriNames] = React.useState(Array(pasageri).fill(''));
  const [mesajSucces, setMesajSucces] = useState('');

  const handlePasageriNameChange = (index, event) => {
  const updatedPasageriNames = [...pasageriNames];
  updatedPasageriNames[index] = event.target.value;
  setPasageriNames(updatedPasageriNames);
};


  const convertStringToDate = (dateString) => {
    return dateString ? new Date(dateString) : null;
  };
  
  const handleRezervare = async () => {
    try {
      const requestData = {
        nrPasageri: pasageri,
    };
    //const response = await axios.post("http://localhost:8080/", {requestData});
    //console.log(response.data);
    setMesajSucces('Rezervarea ta a fost efectuată cu succes! Vei primi pe adresa de e-mail un formular pentru completarea datelor personale și vei fi redirecționat către terminalul de plată.');
} catch (error){
  console.error('Error making reservation:', error);
}
  };
  

  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

  const handlePasageriChange = (event, val) => {
    setPasageri(val < 0 ? 0 : val);
  };
  


  const handleClick = async (e) => {
    e.preventDefault()
    const formattedDate1 = selectedDate1 ? selectedDate1.toISOString().split('T')[0] : null;
    try {
        const response = await axios.get('http://localhost:8080/bilete/getByQuery', {
          params: {
            orasPlecare: orasPlecare,
            orasDestinatie: orasDestinatie,
            dataPlecare: formattedDate1
          }
        });
    
        console.log(response.data);
        setBilete(response.data);
        setRezervare(null);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    
  };


  useEffect(()=>{
    fetch("http://localhost:8080/bilete/getAll")
    .then(res=>res.json())
    .then((result)=>{
        console.log(result);
        setBilete(result);
    }
  )
  },[])

  return (
    <div className="Bilet">
      <Appbar />
      <Box marginTop={2}>
            {/* Adaugă spațiu între cele două componente */}
          </Box>
      <TextField
        id="outlined-multiline-flexible"
        label="Orașul de plecare"
        multiline
        maxRows={4}
        value={orasPlecare}
        onChange={(e) => setOrasPlecare(e.target.value)}
      />

      <TextField
        id="outlined-textarea"
        label="Orașul destinație"
        multiline
        value={orasDestinatie}
        onChange={(e) => setOrasDestinatie(e.target.value)}
      />
      <CheckBox />
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
      <Box marginBottom={3}>
        {/* Adaugă spațiu între cele două componente */}
      </Box>
      <div>
        <b>Introduceți nr. pasagerilor:</b>
      </div>
      <div>
        <div>
          <div>
            <StyledStepperButton className="increment" onClick={() => handlePasageriChange(null, pasageri + 1)}>
              <ArrowDropUpRoundedIcon />
            </StyledStepperButton>
            <StyledStepperButton className="decrement" onClick={() => handlePasageriChange(null, pasageri - 1)}>
              <ArrowDropDownRoundedIcon />
            </StyledStepperButton>
            <HiddenInput readOnly value={pasageri} />
          </div>
          <Pre>Pasageri: {pasageri ?? ' '}</Pre>
        </div>
      </div>
      <Button variant="contained" endIcon={<SendIcon />} onClick={handleClick}>
        Caută acum
      </Button>
      {/* Afișarea biletelor */}
    <Paper elevation={3} style={paperStyle}>
      <h1>Bilete</h1>

      {bilete.map(bilet => (
        <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={bilet.id}>
          Oraș Plecare: {bilet.orasPlecare}<br />
          Oraș Destinație: {bilet.orasDestinatie}<br />
          Dată Plecare: {bilet.dataPlecare}<br />
          Oră Plecare: {bilet.oraPlecare}<br />
          Preț: {bilet.pret}<br />
          <Button variant="contained" endIcon={<SendIcon />} onClick={() => setRezervare(bilet)}>
        Rezervă bilet
      </Button>
        </Paper>
      ))}
      {rezervare && (
  <div>
    {/* ... Detalii rezervare existente ... */}
    
    <div>
  <label>
    <Checkbox />
    Bagaj de mână(gratuit)
  </label>
  <label>
    <Checkbox />
    Bagaj de cală(+200RON)
  </label>
</div>

    <TextField
     label="Adresa de e-mail"
    />
<div>

<Box marginTop={2}>
    {/* Adaugă spațiu între cele două componente */}
    </Box>
  
  {[...Array(pasageri)].map((_, index) => (
    <TextField
      key={index}
      label={`Numele pasagerului ${index + 1}`}
      multiline
      value={pasageriNames[index] || ''}
      onChange={(e) => handlePasageriNameChange(index, e)}
    />
  ))}
</div>

    <Button variant="contained" endIcon={<SendIcon />} onClick={handleRezervare}>
      Finalizează rezervarea
    </Button>
    </div>
      )}
      {mesajSucces && (
  <div style={{ color: 'green', marginTop: '10px' }}>
    {mesajSucces}
  </div>
)}
    </Paper>
  </div>
);
}

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const StyledInputRoot = styled('div')(
    ({ theme }) => `
      display: grid;
      grid-template-columns: 2rem;
      grid-template-rows: 2rem 2rem;
      grid-template-areas:
        "increment"
        "decrement";
      row-gap: 1px;
      overflow: auto;
      border-radius: 8px;
      border-style: solid;
      border-width: 1px;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      box-shadow: 0px 2px 4px ${
        theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
      };
    `,
  );
  
  const HiddenInput = styled('input')`
    visibility: hidden;
    position: absolute;
  `;
  
  const StyledStepperButton = styled('button')(
    ({ theme }) => `
    display: flex;
    flex-flow: nowrap;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
    box-sizing: border-box;
    border: 0;
    padding: 0;
    color: inherit;
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
      color: ${grey[50]};
    }
  
    &:focus-visible {
      outline: 0;
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
    }
  
    &.increment {
      grid-area: increment;
    }
  
    &.decrement {
      grid-area: decrement;
    }
  `,
  );
  
  const Layout = styled('div')`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    column-gap: 1rem;
  `;
  
  const Pre = styled('pre')`
    font-size: 0.75rem;
  `;

export default Bilet;