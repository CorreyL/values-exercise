import {} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { columnKeys, lockedValuesKey } from '../../constants';
import { ValuesAndDescriptors } from '../../types';

interface SaveAndLoadProps {
  lockedValues: Array<string>;
  veryImportantValues: ValuesAndDescriptors;
  importantValues: ValuesAndDescriptors;
  notImportantValues: ValuesAndDescriptors;
  setVeryImportantValues: React.Dispatch<React.SetStateAction<ValuesAndDescriptors>>;
  setImportantValues: React.Dispatch<React.SetStateAction<ValuesAndDescriptors>>;
  setNotImportantValues: React.Dispatch<React.SetStateAction<ValuesAndDescriptors>>;
  setLockedValues: React.Dispatch<React.SetStateAction<Array<string>>>;
};

export default function SaveAndLoad(props: SaveAndLoadProps) {
  const {
    lockedValues,
    veryImportantValues,
    importantValues,
    notImportantValues,
    setVeryImportantValues,
    setImportantValues,
    setNotImportantValues,
    setLockedValues,
  } = props;

  const loadProgressFromFile = () => {
    const input = document.createElement('input');
    input.style.display = 'none';
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
            setLockedValues(parsedLoadedFile[lockedValuesKey]);
          }
          input.remove();
        }
      }
    };
  };

  const saveValuesToLocalStorage = () => {
    localStorage.setItem(columnKeys.VERY_IMPORTANT_VALUES, JSON.stringify(veryImportantValues));
    localStorage.setItem(columnKeys.IMPORTANT_VALUES, JSON.stringify(importantValues));
    localStorage.setItem(columnKeys.NOT_IMPORTANT_VALUES, JSON.stringify(notImportantValues));
    localStorage.setItem(lockedValuesKey, JSON.stringify(lockedValues));
  };

  return (
    <Stack
      justifyContent="center"
      direction="row"
      spacing={2}
    >
      <Button
        variant="contained"
        color="success"
        onClick={saveValuesToLocalStorage}
      >
        Save Progress
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          saveValuesToLocalStorage();
          const jsonToSave = {
            [columnKeys.VERY_IMPORTANT_VALUES]: veryImportantValues,
            [columnKeys.IMPORTANT_VALUES]: importantValues,
            [columnKeys.NOT_IMPORTANT_VALUES]: notImportantValues,
            [lockedValuesKey]: lockedValues,
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
        onClick={loadProgressFromFile}
      >
        Load Progress From File
      </Button>
    </Stack>
  );
};
