import { Grid, Typography } from '@mui/material';

export const CardLabel: React.FC<{
  label: string;
  value?: number;
}> = ({ label, value }) => (
  <Grid container alignItems="baseline">
    <Grid item>
      <Typography variant="h6">{label}</Typography>
    </Grid>
    {/* Allow for value 0 */}
    {typeof value !== 'undefined' && (
      <Grid item ml={1}>
        <Typography variant="body2">{value.toLocaleString()}</Typography>
      </Grid>
    )}
  </Grid>
);
