import Box from '@mui/material/Box';
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

export default function Value({
  value,
  descriptor,
  draggable = false,
  onDragStart = null,
  onDragEnd = null,
}: ValueProps) {
  /**
   * @todo Make fonts look better @_@
   */
  return (
    <Box
      sx={{ minWidth: 275 }}
      draggable={draggable}
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
        </CardContent>
      </Card>
    </Box>
  );
}
