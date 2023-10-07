import { weatherDataType } from "../src/types";

//mock test weather data for testing
const mockWeatherData: weatherDataType = {
  name: 'test-city',
  country: 'test-country',
  list: [
    {
      dt: 123,
      main: {
        temp: 75,
        temp_min: 70,
        temp_max: 80,
      },
      weather: [
        {
          main: 'string',
          description: 'string',
          icon: 'string',
        },
      ],
    },
  ],
};

export default mockWeatherData;