import {
  useState,
} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface ValueProps {
  value: string;
  descriptor: string;
  draggable?: boolean;
  onDragStart?: any;
  onDragEnd?: any;
  /**
   * @todo Refactor Value component to make these optional props
   */
  lockedValues: Array<string>,
  setLockedValues: React.Dispatch<React.SetStateAction<Array<string>>>,
};

const unlockIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="25px" height="25px">
      <path d="M 22.78125 0 C 21.605469 -0.00390625 20.40625 0.164063 19.21875 0.53125 C 12.902344 2.492188 9.289063 9.269531 11.25 15.59375 L 11.25 15.65625 C 11.507813 16.367188 12.199219 18.617188 12.625 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 14.75 20 C 14.441406 19.007813 13.511719 16.074219 13.125 15 L 13.15625 15 C 11.519531 9.722656 14.5 4.109375 19.78125 2.46875 C 25.050781 0.832031 30.695313 3.796875 32.34375 9.0625 C 32.34375 9.066406 32.34375 9.089844 32.34375 9.09375 C 32.570313 9.886719 33.65625 13.40625 33.65625 13.40625 C 33.746094 13.765625 34.027344 14.050781 34.386719 14.136719 C 34.75 14.226563 35.128906 14.109375 35.375 13.832031 C 35.621094 13.550781 35.695313 13.160156 35.5625 12.8125 C 35.5625 12.8125 34.433594 9.171875 34.25 8.53125 L 34.25 8.5 C 32.78125 3.761719 28.601563 0.542969 23.9375 0.0625 C 23.550781 0.0234375 23.171875 0 22.78125 0 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z"/>
    </svg>
  );
};

const lockIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="25px" height="25px">
      <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z"/>
    </svg>
  );
};

export default function Value({
  value,
  descriptor,
  draggable = false,
  onDragStart = null,
  onDragEnd = null,
  lockedValues,
  setLockedValues,
}: ValueProps) {
  const [ isLocked, setIsLocked ] = useState<boolean>(lockedValues.includes(value));
  const changeLockstate = () => {
    setLockedValues(state => {
      if (isLocked) {
        // The value exists in the array, remove it
        setIsLocked(!isLocked);
        return state.filter(stateValue => stateValue !== value);
      }
      setIsLocked(!isLocked);
      state.push(value);
      return state;
    });
  };
  /**
   * @todo Make fonts look better @_@
   */
  return (
    <Box
      sx={{ minWidth: 275 }}
      draggable={!isLocked}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {value}
          </Typography>
          <Typography variant="body2">
            {descriptor}
          </Typography>
          <Button
             variant="contained"
             onClick={changeLockstate}
             color={
              isLocked
                ? "error"
                : "success"
             }
          >
            {
              isLocked
                ? lockIcon()
                : unlockIcon()
            }
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
