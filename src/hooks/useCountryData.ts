// 'use client';

import { Country, CountryDataReponse, FetchData } from '@/types';
import { useEffect, useState } from 'react';

const useCountryData = (): FetchData<Country[]> => {
  const [{ data, loading, error }, setCountryResponse] = useState<
    FetchData<Country[]>
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

        let countriesData = (await countriesDataResponse)
          .reduce<Country[]>(
            (prev, { name: { common: name }, area, population }) => {
              prev = [...prev, { name, area, population }];
              return prev;
            },
            []
          )
          .sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          });

        setCountryResponse({
          data: countriesData,
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
