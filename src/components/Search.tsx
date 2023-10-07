import { cityType } from '../types';
import { SearchProps } from '../types';

const Search = ({
  city,
  cityOptions,
  onCityChange,
  onCitySelect,
  onSubmit,
  hideLogo,
  isLoading,
  error,
}: SearchProps): JSX.Element => {
  return (
    <>
      <div
        className={`content flex items-center justify-center py-2 ${
          hideLogo ? 'invisible' : ''
        }`}
      >
        {!hideLogo && (
          <>
            <img
              src='/coates-logo.png'
              alt='Weather Image'
              className='m-0 w-auto h-40'
            />
            <header className='text-3xl text-white m-0'>Weather Service</header>
          </>
        )}
      </div>
      <div className='relative text-gray-600'>
        <input
          autoComplete='off'
          type='search'
          name='search'
          placeholder='Search City'
          value={city}
          onChange={onCityChange}
          className='bg-white h-10 md:h-12 px-5 md:px-8 rounded-full text-sm focus:outline-none border border-gray-300 w-full shadow-xl'
        />
        <button
          onClick={onSubmit}
          className='absolute right-0 top-0 mt-3 md:mt-4 mr-4'
        >
          <svg
            className='h-3 md:h-4 w-3 md:w-4 fill-current text-gray-600'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 56.966 56.966'
          >
            <path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.920,2.162,0.920  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.080,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.610,6,23.984,6z' />
          </svg>
        </button>
        {/* Show error message if there's an error */}
        {error ? (
          <div className='text-center mt-4 text-white'>{error}</div>
        ) : isLoading ? (
          <div className='text-center mt-4 text-white'>Loading...</div>
        ) : (
          city &&
          cityOptions.length > 0 && (
            <ul className='w-full mt-1 h-50 border border-gray-300 rounded-md bg-white absolute'>
              {cityOptions.map((city: cityType) => (
                <li
                  key={'' + city.lat + city.lon}
                  className='cursor-pointer hover:bg-gray-200 p-2'
                  onClick={() => onCitySelect(city)}
                >
                  {`${city.name}, ${city.country}`}
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </>
  );
};

export default Search;
