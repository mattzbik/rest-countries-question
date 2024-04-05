import { Country, CountryData, CountryDataReponse, FetchData } from '@/types';
import {
  currencyReducer,
  meanDensity,
  medianDensity,
  populationDensity,
  standardDeviationDensity,
  unMemberCount,
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
          (
            prev,
            { name: { common: name }, area, population, unMember, currencies }
          ) => {
            prev = [
              ...prev,
              {
                name,
                area,
                population,
                populationDensity: populationDensity(population, area),
                unMember,
                currencies: currencyReducer(currencies),
              },
            ];
            return prev;
          },
          []
        );

        let data = {
          unMembers: unMemberCount(countries),
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
