import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface ValueProps {
  value: string;
  descriptor: string;
};

export default function Value({
  value,
  descriptor,
}: ValueProps) {
  /**
   * @todo Make fonts look better @_@
   */
  return (
    <Box sx={{ minWidth: 275 }}>
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
