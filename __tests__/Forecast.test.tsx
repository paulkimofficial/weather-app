import React from 'react';
import { render, screen } from '@testing-library/react';
import Forecast from '../src/components/Forecast';
import mockWeatherData from '../__mocks__/weatherDataMock';


describe('Forecast', () => {
  it('renders without errors', () => {
    const { container } = render(<Forecast data={mockWeatherData} />);
    expect(container).toBeTruthy();
  });

  it('should display city name', () => {
    render(<Forecast data={mockWeatherData} />);
    const city = screen.getByText(/test-city/i);
    expect(city).toBeInTheDocument();
  });
  it('should display average temperature', () => {
    render(<Forecast data={mockWeatherData} />);
    const country = screen.getByText(/75/i);
    expect(country).toBeInTheDocument();
  });
  it('should display low temperature', () => {
    render(<Forecast data={mockWeatherData} />);
    const country = screen.getByText(/L: 70/i);
    expect(country).toBeInTheDocument();
  });
  it('should display high temperature', () => {
    render(<Forecast data={mockWeatherData} />);
    const country = screen.getByText(/H: 80/i);
    expect(country).toBeInTheDocument();
  });
});
