import React, { ChangeEvent, useEffect } from 'react';
import { debounce } from 'lodash';
import { cityType, weatherDataType } from '../types';
import Search from './Search';
import Forecast from './Forecast';

const MainContainer = (): JSX.Element => {
  const [city, setCity] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);
  const [cityOptions, setCityOptions] = React.useState<cityType[]>([]);
  const [selectedCity, setSelectedCity] = React.useState<cityType | null>(null);
  const [weatherData, setWeatherData] = React.useState<weatherDataType | null>(
    null
  );
  const [hideLogo, setHideLogo] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // City suggestions (up to 5 cities) are provided by auto-complete when typing
  const fetchCities = async (cityValue: string) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=5&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      if (!response.ok) {
        throw new Error('Error fetching cities');
      }
      const data = await response.json();
      // CityOptions holds an array of cities based on auto-complete
      setCityOptions(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      // Error handler for bad requests
      setError('An error occurred while fetching cities');
    }
    // Loader is set back to false
    setIsLoading(false);
  };

  // Limit fetch requests 500ms after input (when user stops typing)
  const debouncedFetch = debounce(fetchCities, 500);

  // Handle input change (calls debounced fetch function)
  const onCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Set state variable to be used in query params
    setCity(newValue);

    // Ensure fetch is not made with an empty string param
    if (newValue.length) {
      debouncedFetch(newValue);
    } else {
      setCityOptions([]); // Clear city options when the input is empty
    }
  };

  // Handle city selection (by click) state
  const onCitySelect = (city: cityType) => {
    setSelectedCity(city);
    // Combine city name and country and set it as the input value
    setCity(`${city.name}, ${city.country}`);
    setCityOptions([]); // Clear city options after selection
  };

  // Handles fetch with a specific city and returns current and 5-day forecast
  const onSubmit = async () => {
    // Ensure fetch is not made before the city is chosen
    if (!selectedCity) {
      setError('Please Enter a Valid City');
      return;
    }
    setIsLoading(true);
    try {
      // Send fetch with latitude, longitude to forecast API
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${
          selectedCity.lat
        }&lon=${selectedCity.lon}&units=imperial&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      if (!response.ok) {
        throw new Error('Error fetching weather data');
      }
      const data = await response.json();
      // Initialize weatherForecast obj to hold all relevant data
      const weatherForecast = {
        ...data.city,
        list: data.list,
      };
      // Conditionally minimize logo before loading forecast
      setHideLogo(true);
      // Set state variable to retrieved metrics for component rendering
      setWeatherData(weatherForecast);
      setError(null); // Clear any previous errors
    } catch (error) {
      // Error handling for failed fetches
      setError('An error occurred while fetching weather data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Clear any previous error when city changes
    setError(null);
  }, [city]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-800 to-blue-400'>
      <div className='w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-start md:px-10 h-full lg:h-[1500px] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700 shadow-2xl'>
        {weatherData ? (
          <>
            <Forecast data={weatherData} />
            <Search
              city={city}
              cityOptions={cityOptions}
              error={error}
              onCityChange={onCityChange}
              onCitySelect={onCitySelect}
              onSubmit={onSubmit}
              hideLogo={hideLogo}
              isLoading={isLoading}
              selectedCity={selectedCity}
            />
          </>
        ) : (
          <>
            <Search
              city={city}
              cityOptions={cityOptions}
              error={error}
              onCityChange={onCityChange}
              onCitySelect={onCitySelect}
              onSubmit={onSubmit}
              hideLogo={hideLogo}
              isLoading={isLoading}
              selectedCity={selectedCity}
            />

            <div className='flex flex-col text-center items-center text-xl font-bold tracking-wider avatar'>
              <div className='mt-10'>
                <a
                  href='https://github.com/paulkimofficial/weather-app'
                  target='_blank'
                  className=''
                >
                  <i className='fa-brands p-1 text-white fa-github'></i>{' '}
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainContainer;
