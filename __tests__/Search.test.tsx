import React from 'react';
import { render,screen } from '@testing-library/react';
import Search from '../src/components/Search';
import mockSearchProps from '../__mocks__/searchPropsMock';


describe('Search', () => {
  it('loading message shows while fetching', () => {
  
    render(<Search {...mockSearchProps} />);
    const loadingMessage = screen.queryByText(/Loading/i)
    expect(loadingMessage).toBeInTheDocument();

  
  });


});
