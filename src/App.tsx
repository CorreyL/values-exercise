import {
  useEffect,
  useState,
} from 'react'
import Value from './components/Value';
import ValuesColumn from './components/ValuesColumn';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import valuesJson from './data/values-and-descriptors.json';
import './App.css'

export type ValuesAndDescriptors = {
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

/**
 * Delete the chosen Value from the original set of Values and sort it into
 * the chosen Column
 *
 * @param value The Value chosen
 * @param originalValues The Object holding all unchosen Values
 * @param originalValuesSetter The Setter for the Object holding all unchosen
 * Values
 * @param setter The Setter for the Column that the Value will be sorted into
 */
const handleChosenValue = (
  value: string,
  originalValues: ValuesAndDescriptors,
  originalValuesSetter: React.Dispatch<React.SetStateAction<ValuesAndDescriptors>>,
  setter: React.Dispatch<React.SetStateAction<ValuesAndDescriptors>>,
): void => {
  const descriptor: string = originalValues[value];
  originalValuesSetter(state => {
    delete state[value];
    return state;
  });
  setter(state => ({
    ...state,
    [value]: descriptor,
  }));
};

const getNewValue = (
  values: ValuesAndDescriptors,
  setter: React.Dispatch<React.SetStateAction<string>>
): void => {
  const valuesKeys: Array<string> = Object.keys(values);
  setter(valuesKeys[Math.floor(Math.random() * valuesKeys.length)]);
};

function App() {
  const [ values, setValues ] = useState<ValuesAndDescriptors>(valuesJson);
  const [ veryImportantValues, setVeryImportantValues ] = useState<ValuesAndDescriptors>({});
  const [ importantValues, setImportantValues ] = useState<ValuesAndDescriptors>({});
  const [ notImportantValues, setNotImportantValues ] = useState<ValuesAndDescriptors>({});
  const columnsTitleToStateMapping = {
    [columns[0]]: { state: veryImportantValues, setter: setVeryImportantValues },
    [columns[1]]: { state: importantValues, setter: setImportantValues },
    [columns[2]]: { state: notImportantValues, setter: setNotImportantValues },
  };
  /**
   * @todo Remove random choosing of value once choice and storing is
   * implemented
   */
  const [ randomValue, setRandomValue ] = useState<string>('');

  useEffect(() => {
    getNewValue(values, setRandomValue);
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
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleChosenValue(randomValue, values, setValues, setVeryImportantValues);
              getNewValue(values, setRandomValue);
            }}
          >
            {columns[0]}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleChosenValue(randomValue, values, setValues, setImportantValues);
              getNewValue(values, setRandomValue);
            }}
          >
            {columns[1]}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleChosenValue(randomValue, values, setValues, setNotImportantValues);
              getNewValue(values, setRandomValue);
            }}
          >
            {columns[2]}
          </Button>
        </Stack>
        <Box>
          <Grid container spacing={2}>
            {
              columns.map((columnTitle, idx) => (
                <ValuesColumn
                  key={`column-${idx}`}
                  columnTitle={columnTitle}
                  values={columnsTitleToStateMapping[columnTitle].state}
                  columnSetter={columnsTitleToStateMapping[columnTitle].setter}
                />
              ))
            }
          </Grid>
        </Box>
      </main>
    </ThemeProvider>
  )
}

export default App
