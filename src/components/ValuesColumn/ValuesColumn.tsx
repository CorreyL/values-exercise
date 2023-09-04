import { DragEvent, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Value from '../Value';
import { columns, ValuesAndDescriptors } from '../../App';

interface ValuesColumnProps {
  columnTitle: string,
  columnSetter: React.Dispatch<React.SetStateAction<ValuesAndDescriptors>>,
  values: ValuesAndDescriptors,
};

export default function ValuesColumn({
  columnTitle,
  columnSetter,
  values,
}: ValuesColumnProps) {
  useEffect(() => {}, [values]);
  return (
    <Grid
      md={4}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => {
        event.dataTransfer.setData('droppableZone', 'true');
        const value = event.dataTransfer.getData('value');
        const descriptor = event.dataTransfer.getData('descriptor');
        columnSetter(state => ({
          ...state,
          [value]: descriptor,
        }));
      }}
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
        Object.keys(values).map((value, idx) => (
          <Value
            key={`${columnTitle}-${value}-${idx}`}
            value={value}
            descriptor={values[value]}
            draggable
            onDragStart={(event: DragEvent) => {
              event.dataTransfer.clearData();
              event.dataTransfer.setData('value', value);
              event.dataTransfer.setData('descriptor', values[value]);
            }}
            onDragEnd={(event: DragEvent) => {
              /**
               * @todo Need to determine if it was actually dropped in a
               * droppable zone, otherwise it'll just get deleted
               */
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
