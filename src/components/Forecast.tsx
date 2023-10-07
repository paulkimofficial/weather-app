import { weatherDataType } from '../types';

type Props = {
  data: weatherDataType;
};

const Forecast = ({ data }: Props): JSX.Element => {
  if (!data || !data.list)  {
    // Handle the case where data is empty or undefined
    return <div className="text-white">No forecast data available.</div>;
  }

  return (
    <section>
      <div className='content flex items-center justify-start p-0'>
        <img
          src='/coates-logo.png'
          alt='Weather Image'
          className='m-0 w-20 h-20 mr-4'
        />
        <div>
          <h2 className='text-3xl text-white mb-2'>{`${data.name}, ${data.country}`}</h2>
        </div>
      </div>
      <div className='flex flex-col items-center mb-2'>
        <img
          src={`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`}
          alt='Weather Icon'
        />
        <h1 className='text-7xl text-white'>
          {/* remove decimal in temp by rounding */}
          {Math.round(data.list[0].main.temp)}
          <span>&#176;</span>
        </h1>
        <h3 className='text-white'>
          {data.list[0].weather[0].main} - {data.list[0].weather[0].description}
        </h3>
        <h3 className='text-white'>
          H: {Math.round(data.list[0].main.temp_max)}
          <span>&#176;</span> L: {Math.round(data.list[0].main.temp_min)}
          <span>&#176;</span>
        </h3>
      </div>
      {/* Weather forecast for the next five days 
      api limits array data at 40 */}
      {data.list.map((day, i) => {
        // use modulo to gather data for 5 different days
        if (i % 7 === 0 && i !== 0) {
          return (
            <div
              key={day.dt}
              className='flex flex-row justify-between mb-1 items-center bg-blue-500 bg-opacity-40 rounded-lg shadow-xl px-10 text-white'
            >
              <p className='mr-2'>{new Date(day.dt * 1000).toLocaleDateString()}</p>
              <p className='font-bold'>{Math.round(day.main.temp)}&#176;</p>
              <p>{day.weather[0].main}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt='Weather Icon'
              />
            </div>
          );
        }
        return null;
      })}
    </section>
  );
};

export default Forecast;