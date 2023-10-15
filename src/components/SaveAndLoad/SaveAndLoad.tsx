import {} from 'react';
import { columnKeys, lockedValuesKey } from '../../constants';
import { ValuesAndDescriptors } from '../../types';

interface SaveAndLoadProps {
  lockedValues: Array<string>;
  veryImportantValues: ValuesAndDescriptors;
  importantValues: ValuesAndDescriptors;
  notImportantValues: ValuesAndDescriptors;
};

export default function SaveAndLoad(props: SaveAndLoadProps) {
  const {
    lockedValues,
    veryImportantValues,
    importantValues,
    notImportantValues,
  } = props;

  const saveValuesToLocalStorage = () => {
    localStorage.setItem(columnKeys.VERY_IMPORTANT_VALUES, JSON.stringify(veryImportantValues));
    localStorage.setItem(columnKeys.IMPORTANT_VALUES, JSON.stringify(importantValues));
    localStorage.setItem(columnKeys.NOT_IMPORTANT_VALUES, JSON.stringify(notImportantValues));
    localStorage.setItem(lockedValuesKey, JSON.stringify(lockedValues));
  };
};
