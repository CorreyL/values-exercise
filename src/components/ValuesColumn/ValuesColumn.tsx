import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

interface ValuesColumnProps {
  columnTitle: string,
  // values: Array<Object>,
};

export default function ValuesColumn({
  columnTitle,
  // values,
}: ValuesColumnProps) {
  return (
    <Grid md={4}>
      <Typography variant="h4" component="div">
        {columnTitle}
      </Typography>
    </Grid>
  );
}
