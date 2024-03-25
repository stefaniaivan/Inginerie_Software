import * as React from 'react';
import { unstable_useNumberInput as useNumberInput } from '@mui/base/unstable_useNumberInput';
import { styled } from '@mui/system';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import Box from '@mui/material/Box';

const CompactNumberInput = React.forwardRef(function CompactNumberInput(props, ref) {
  const {
    getRootProps,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput(props);

  const inputProps = getInputProps();

  inputProps.ref = useForkRef(inputProps.ref, ref);

  return (
    <StyledInputRoot {...getRootProps()}>
      <StyledStepperButton className="increment" {...getIncrementButtonProps()}>
        <ArrowDropUpRoundedIcon />
      </StyledStepperButton>
      <StyledStepperButton className="decrement" {...getDecrementButtonProps()}>
        <ArrowDropDownRoundedIcon />
      </StyledStepperButton>
      <HiddenInput {...inputProps} />
    </StyledInputRoot>
  );
});

export default function Pasageri() {
  const [adulti, setAdulti] = React.useState(0);
  const [copii, setCopii] = React.useState(0);
  const [bebelusi, setBebelusi] = React.useState(0);
  const handleAdultiChange = (event, val) => {
    // Verificați dacă valoarea este mai mică decât 0 și, în caz afirmativ, setați-o la 0
    setAdulti(val < 0 ? 0 : val);
  };
  const handleCopiiChange = (event, val) => {
    // Verificați dacă valoarea este mai mică decât 0 și, în caz afirmativ, setați-o la 0
    setCopii(val < 0 ? 0 : val);
  };
  const handleBebChange = (event, val) => {
    // Verificați dacă valoarea este mai mică decât 0 și, în caz afirmativ, setați-o la 0
    setBebelusi(val < 0 ? 0 : val);
  };

  return (
    <Box display="flex" justifyContent="center">
    <Layout>
      <div>
        <CompactNumberInput
          aria-label="Adulti"
          placeholder="Adulti"
          readOnly
          value={adulti}
          onChange={handleAdultiChange}
        />
        <Pre>Adulti: {adulti ?? ' '}</Pre>
      </div>
      <div>
        <CompactNumberInput
          aria-label="Copii"
          placeholder="Copii"
          readOnly
          value={copii}
          onChange={handleCopiiChange}
        />
        <Pre>Copii(2-18 ani): {copii ?? ' '}</Pre>
      </div>
      <div>
        <CompactNumberInput
          aria-label="Bebelusi"
          placeholder="Bebelusi"
          readOnly
          value={bebelusi}
          onChange={handleBebChange}
        />
        <Pre>Bebelusi(0-2 ani): {bebelusi ?? ' '}</Pre>
      </div>
    </Layout>
    </Box>
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
