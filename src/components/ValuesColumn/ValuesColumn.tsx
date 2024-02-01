import { DragEvent, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Value from '../Value';
import { columns } from '../../constants';
import { ValuesAndDescriptors } from '../../types';
import './ValuesColumn.css';

interface ValuesColumnProps {
  columnTitle: string,
  columnSetter: React.Dispatch<React.SetStateAction<ValuesAndDescriptors>>,
  values: ValuesAndDescriptors,
}

export default function ValuesColumn({
  columnTitle,
  columnSetter,
  values,
}: ValuesColumnProps) {
  const [ droppedSelf, setDroppedSelf ] = useState<boolean>(false);
  return (
    <Grid
      md={4}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => {
        if (event.dataTransfer.getData('originalcolumn') === columnTitle) {
          setDroppedSelf(true);
          return;
        }
        const value = event.dataTransfer.getData('value');
        const descriptor = event.dataTransfer.getData('descriptor');
        if (!value && !descriptor) {
          return;
        }
        columnSetter(state => ({
          ...state,
          [value]: descriptor,
        }));
      }}
      minWidth={'325px'}
      className="values-column"
    >
      <Typography variant="h4" component="div">
        {columnTitle} (
          <span
            style={
              (
                columnTitle === columns[0] && Object.keys(values).length > 12
                  ? {color: 'red'}
                  : {}
              )
            }
          >
            {Object.keys(values).length}
          </span>
        )
      </Typography>
      {
        Object.keys(values).reverse().map((value, idx) => (
          <Value
            key={`${columnTitle}-${value}-${idx}`}
            value={value}
            descriptor={values[value]}
            draggable
            onDragStart={(event: DragEvent<Element>) => {
              event.dataTransfer.clearData();
              setDroppedSelf(false);
              event.dataTransfer.setData('originalcolumn', columnTitle);
              event.dataTransfer.setData('value', value);
              event.dataTransfer.setData('descriptor', values[value]);
            }}
            onDragEnd={(event: DragEvent<Element>) => {
              if (event.dataTransfer.dropEffect === 'none' || droppedSelf) {
                // When dataTransfer.dropEffect is 'none', then the element
                // was not dropped in a drop zone
                return;
              }
              columnSetter(state => {
                const {
                  [value]: valueToDelete,
                  ...rest
                } = state;
                return rest;
              });
            }}
          />
        ))
      }
    </Grid>
  );
}
