import { Country } from '@/types';

export const populationDensity = (population: number, area: number) =>
  Math.round(population / area);

export const meanDensity = (c: Country[]) =>
  c.reduce((prev, curr) => prev + curr.populationDensity, 0) / c.length;

export const medianDensity = (c: Country[]) => {
  const sorted = c.sort((a, b) => a.populationDensity - b.populationDensity);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (
      (sorted[middle - 1].populationDensity +
        sorted[middle].populationDensity) /
      2
    );
  }

  return sorted[middle].populationDensity;
};

export const standardDeviationDensity = (c: Country[]) => {
  const variance = c.reduce<number[]>(
    (prev, { populationDensity: p }) => [...prev, (p - meanDensity(c)) ** 2],
    []
  );
  return Math.sqrt(variance.reduce((prev, curr) => prev + curr, 0) / c.length);
};

export const unMemberCount = (c: Country[]) =>
  c.reduce((prev, curr) => prev + +curr.unMember, 0);

export const currencyReducer = (c: Object) =>
  Object.keys(c).reduce<string[]>((prev, curr) => [...prev, curr], []);

export const currencyCounter = (c: Country[], currency: string) =>
  c.reduce((prev, { currencies }) => prev + +currencies.includes(currency), 0);
