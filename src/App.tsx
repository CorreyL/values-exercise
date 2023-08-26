import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import valuesJson from './data/values-and-descriptors.json';
import './App.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [ values ] = useState(valuesJson);

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
