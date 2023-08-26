import {
  useEffect,
  useState,
} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
        Hello World!
      </main>
    </ThemeProvider>
  )
}

export default App
