export const populationDensity = (population: number, area: number) =>
  `${Math.round(population / area).toLocaleString()} per Km²`;
