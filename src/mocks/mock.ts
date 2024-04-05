import { Country } from '@/types';
import { populationDensity } from '@/utils/utils';

const createCountry = (
  name: string,
  area: number,
  population: number
): Country => ({
  name,
  area,
  population,
  populationDensity: populationDensity(population, area),
});

export const fakeCountries: Country[] = [
  createCountry('Cyprus', 9251, 1207361),
  createCountry('Eritrea', 117600, 5352000),
  createCountry('Liberia', 111369, 5057677),
];
