'use client';
import { CardLabel } from '@/components/CardLabel';
import useCountryData from '@/hooks/useCountryData';
import { currencyCounter } from '@/utils/utils';
import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';

export default function Home() {
  const { data, loading, error } = useCountryData();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1">Rest Countries Information</Typography>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {loading && (
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          )}
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error.message}</Alert>
            </Grid>
          )}
          {data && (
            <Grid item xs={12}>
              <Card raised>
                <CardContent>
                  <CardLabel label="All Countries Population Density Information" />
                  <CardLabel label="Mean:" value={data.mean} isAreaValue />
                  <CardLabel label="Median:" value={data.median} isAreaValue />
                  <CardLabel
                    label="Standard Deviation:"
                    value={data.standardDeviation}
                    isAreaValue
                  />
                  <CardLabel label="UN Members:" value={data.unMembers} />
                  <CardLabel
                    label="Countries using Euro:"
                    value={currencyCounter(data.countries, 'EUR')}
                  />
                </CardContent>
              </Card>
            </Grid>
          )}
          {data?.countries &&
            data?.countries?.map(({ name, populationDensity }, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                <Card raised>
                  <CardContent>
                    <CardLabel label={name} />
                    <CardLabel
                      label="Population Density:"
                      value={populationDensity}
                      isAreaValue
                    />
                    {/* Slightly different from Card Label, could alter the component. */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Container>
  );
}
