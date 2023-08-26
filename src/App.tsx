import {
  useEffect,
  useState,
} from 'react'
import Value from './components/Value';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import valuesJson from './data/values-and-descriptors.json';
import './App.css'

type ValuesAndDescriptors = {
  [value: string]: string;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const columns: Array<string> = [
  'Very Important',
  'Important',
  'Not Important',
];

function App() {
  const [ values ] = useState<ValuesAndDescriptors>(valuesJson);
  /**
   * @todo Remove random choosing of value once choice and storing is
   * implemented
   */
  const [ randomValue, setRandomValue ] = useState<string>('');

  useEffect(() => {
    const valuesKeys: Array<string> = Object.keys(values);
    setRandomValue(valuesKeys[Math.floor(Math.random() * valuesKeys.length)]);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Value
          value={randomValue}
          descriptor={values[randomValue]}
        />
        <Stack
          justifyContent="center"
          direction="row"
          spacing={2}
        >
          <Button variant="contained" color="success">
            {columns[0]}
          </Button>
          <Button variant="contained" color="secondary">
            {columns[1]}
          </Button>
          <Button variant="contained" color="error">
            {columns[2]}
          </Button>
        </Stack>
      </main>
    </ThemeProvider>
  )
}

export default App
