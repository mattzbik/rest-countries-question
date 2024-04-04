'use client';
import useCountryData from '@/hooks/useCountryData';
import { populationDensity } from '@/utils/utils';
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
          {data &&
            data?.map(({ name, area, population }, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                <Card raised>
                  <CardContent>
                    <Typography variant="h5">{name}</Typography>
                    <Typography variant="body2">
                      <strong>{`Population Density:`}</strong>
                      {` ${populationDensity(population, area)}`}
                    </Typography>
                    <Typography>{}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Container>
  );
}
