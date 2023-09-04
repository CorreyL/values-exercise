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

export const columns: Array<string> = [
  'Very Important',
  'Important',
  'Not Important',
];

const columnKeys = {
  VERY_IMPORTANT_VALUES: 'veryImportantValues',
  IMPORTANT_VALUES: 'importantValues',
  NOT_IMPORTANT_VALUES: 'notImportantValues',
};

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
  if (!valuesKeys.length) {
    setter('');
    return;
  }
  setter(valuesKeys[Math.floor(Math.random() * valuesKeys.length)]);
};

function App() {
  const [ values, setValues ] = useState<ValuesAndDescriptors>({});
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
    // Remove duplicates
    const initialValues: ValuesAndDescriptors = JSON.parse(JSON.stringify(valuesJson));
    const removeDuplicates = (value: string) => {
      delete initialValues[value];
    };
    [
      columnKeys.VERY_IMPORTANT_VALUES,
      columnKeys.IMPORTANT_VALUES,
      columnKeys.NOT_IMPORTANT_VALUES
    ].forEach(column => {
      const savedColumn = localStorage.getItem(column);
      if (savedColumn) {
        const parsedColumn = JSON.parse(savedColumn);
        Object.keys(parsedColumn).forEach(removeDuplicates);
        switch(column) {
          case columnKeys.VERY_IMPORTANT_VALUES:
            setVeryImportantValues(parsedColumn);
            break;
          case columnKeys.IMPORTANT_VALUES:
            setImportantValues(parsedColumn);
            break;
          case columnKeys.NOT_IMPORTANT_VALUES:
            setNotImportantValues(parsedColumn);
            break;
        }
      }
    });
    setValues(initialValues);
  }, []);

  useEffect(() => {
    getNewValue(values, setRandomValue);
  }, [values]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Stack
          justifyContent="center"
          direction="row"
          spacing={2}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              localStorage.setItem(columnKeys.VERY_IMPORTANT_VALUES, JSON.stringify(veryImportantValues));
              localStorage.setItem(columnKeys.IMPORTANT_VALUES, JSON.stringify(importantValues));
              localStorage.setItem(columnKeys.NOT_IMPORTANT_VALUES, JSON.stringify(notImportantValues));
            }}
          >
            Save Progress
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              localStorage.setItem(columnKeys.VERY_IMPORTANT_VALUES, JSON.stringify(veryImportantValues));
              localStorage.setItem(columnKeys.IMPORTANT_VALUES, JSON.stringify(importantValues));
              localStorage.setItem(columnKeys.NOT_IMPORTANT_VALUES, JSON.stringify(notImportantValues));
              const jsonToSave = {
                [columnKeys.VERY_IMPORTANT_VALUES]: veryImportantValues,
                [columnKeys.IMPORTANT_VALUES]: importantValues,
                [columnKeys.NOT_IMPORTANT_VALUES]: notImportantValues,
              };
              const element = document.createElement('a');
              const textFile = new Blob([JSON.stringify(jsonToSave)], {type: 'text/plain'});
              element.href = URL.createObjectURL(textFile);
              element.download = 'values.json';
              document.body.appendChild(element); 
              element.click();
              element.remove();
            }}
          >
            Save Progress To File
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              document.body.appendChild(input);
              input.click();
              input.onchange = (event) => {
                const fileReader = new FileReader();
                if (event?.target && (event.target as HTMLInputElement).files?.length) {
                  // Typescript is not recognizing that event and target have
                  // already been null-checked, begrudgingly ts-ignore
                  // @ts-ignore
                  fileReader.readAsText(event.target.files[0], 'UTF-8');
                  fileReader.onload = (event) => {
                    if (event?.target?.result) {
                      const parsedLoadedFile = JSON.parse(event.target.result as string);
                      setVeryImportantValues(parsedLoadedFile[columnKeys.VERY_IMPORTANT_VALUES]);
                      setImportantValues(parsedLoadedFile[columnKeys.IMPORTANT_VALUES]);
                      setNotImportantValues(parsedLoadedFile[columnKeys.NOT_IMPORTANT_VALUES]);
                    }
                  }
                }
              };
            }}
          >
            Load Progress From File
          </Button>
        </Stack>
        {(randomValue !== '')
          && (
            <>
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
            </>
          )
        }
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
