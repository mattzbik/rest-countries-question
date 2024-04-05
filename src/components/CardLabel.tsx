import { Grid, Typography } from '@mui/material';

export const CardLabel: React.FC<{
  label: string;
  isAreaValue?: boolean; // Normally would avoid having a boolean of this kind as a prop but done for the purposes of the question and ease of use for styling.
  value?: number;
}> = ({ label, isAreaValue = false, value }) => (
  <Grid container alignItems="baseline">
    <Grid item>
      <Typography>{label}</Typography>
    </Grid>
    {/* Allow for value 0 */}
    {typeof value !== 'undefined' && (
      <Grid item ml={1}>
        <Typography variant="body2">
          {value.toLocaleString()}
          {isAreaValue ? ' per Km²' : ''}
        </Typography>
      </Grid>
    )}
  </Grid>
);
