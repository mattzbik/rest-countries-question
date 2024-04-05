import { Country } from '@/types';
import { populationDensity } from '@/utils/utils';

const createCountry = (
  name: string,
  area: number,
  population: number,
  unMember: boolean,
  currencies: string[]
): Country => ({
  name,
  area,
  population,
  populationDensity: populationDensity(population, area),
  unMember,
  currencies,
});

export const fakeCountries: Country[] = [
  createCountry('Cyprus', 9251, 1207361, true, ['EUR']),
  createCountry('Eritrea', 117600, 5352000, true, ['USD']),
  createCountry('Liberia', 111369, 5057677, true, ['EUR']),
];
