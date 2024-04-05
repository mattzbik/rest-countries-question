// 'use client';

import { Country, CountryData, CountryDataReponse, FetchData } from '@/types';
import {
  meanDensity,
  medianDensity,
  populationDensity,
  standardDeviationDensity,
} from '@/utils/utils';
import { useEffect, useState } from 'react';

const useCountryData = (): FetchData<CountryData> => {
  const [{ data, loading, error }, setCountryResponse] = useState<
    FetchData<CountryData>
  >({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=area,currencies,name,population,unMember'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        let countriesDataResponse: Promise<CountryDataReponse[]> =
          response.json();

        let countries = (await countriesDataResponse).reduce<Country[]>(
          (acc, { name: { common: name }, area, population }) => {
            acc = [
              ...acc,
              {
                name,
                area,
                population,
                populationDensity: populationDensity(population, area),
              },
            ];
            return acc;
          },
          []
        );

        // let mean = meanDensity(countries);
        // let median = medianDensity(countries);
        // let standardDeviation = standardDeviationDensity(countries);

        let data = {
          mean: meanDensity(countries),
          median: medianDensity(countries),
          standardDeviation: standardDeviationDensity(countries),
          countries: countries.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          }),
        };

        // console.log('test', meanDensity(countries), medianDensity(countries), standardDeviationDensity(countries));

        setCountryResponse({
          data: data,
          loading: false,
        });
      } catch (e) {
        setCountryResponse({
          loading: false,
          error: new Error('Error fetching data.'),
        });
      }
    };
    fetchCountryData();
  }, []);

  return { data, loading, error };
};

export default useCountryData;
