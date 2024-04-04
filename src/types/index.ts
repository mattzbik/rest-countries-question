export type FetchData<T> = {
  data?: T | null;
  loading: boolean;
  error?: Error | null;
};

export type CountryDataReponse = {
  name: {
    common: string;
    official: string;
    nativeName: { [key: string]: { official: string; common: string } };
  };
  unMember: boolean;
  currencies: { [key: string]: { name: string; symbol: string } };
  area: number;
  population: number;
};

export type Country = {
  name: string;
  area: number;
  population: number;
};
