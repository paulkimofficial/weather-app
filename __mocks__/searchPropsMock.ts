import { SearchProps } from '../src/types';
import { cityType } from '../src/types';
import { ChangeEvent } from 'react';

//mock test data for search props 
const mockSearchProps: SearchProps = {
  city: 'mockcity',
  cityOptions: [],
  error: null,
  onCityChange: (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  },
  onCitySelect: (city: cityType) => {
    console.log(city);
  },
  onSubmit: () => {},
  hideLogo: true,
  isLoading: true,
  selectedCity: null,
};

export default mockSearchProps;
