import { ChangeEvent } from 'react';
// type declarations
// type declaration for all relevant city information
export type cityType = {
  name: string;
  lat?: number;
  lon?: number;
  country: string;
  state?: string;
};

// type declaration for all relevant weather data for a given city
export type weatherDataType = {
  name: string;
  country: string;
  list: [
    {
      dt: number;
      main: {
        temp: number;
        temp_min: number;
        temp_max: number;
      };
      weather: [
        {
          main: string;
          description: string;
          icon: string;
        }
      ];
    }
  ];
};

// type declaration for all necessary props
export type SearchProps = {
  city: string;
  cityOptions: cityType[];
  error: string | null;
  onCityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCitySelect: (city: cityType) => void;
  onSubmit: () => void;
  hideLogo: boolean;
  isLoading: boolean;
  selectedCity: null | cityType;
};
