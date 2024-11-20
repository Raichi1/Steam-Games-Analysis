import { useState } from 'react'
import type { RequestModel, ResponseModel } from '../types/model'
import { genres, languages } from '../const/request'
import { postPrediction } from '../services/steam'

interface Props {
  onClose: () => void
}

export const ModalCreation: React.FC<Props> = ({ onClose }) => {
  const [response, setResponse] = useState<ResponseModel | null>(null)
  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const request: RequestModel = {
      // from 2024-11-01 to Aug 21, 2012
      'Release date': new Date(
        formData.get('release_date') as string
      ).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      'Peak CCU': Number(formData.get('peak_ccu') ?? 0),
      Price: Number(formData.get('price') ?? 0),
      'DLC count': Number(formData.get('dlc_count') ?? 0),
      'Supported languages': formData.getAll('supported_languages').join(', '),
      Windows: formData.get('windows') === 'on',
      Mac: formData.get('mac') === 'on',
      Linux: formData.get('linux') === 'on',
      'Metacritic score': Number(formData.get('metacritic_score') ?? 0),
      'User score': Number(formData.get('user_score') ?? 0),
      Achievements: Number(formData.get('achievements') ?? 0),
      Positive: Number(formData.get('positive') ?? 0),
      Negative: Number(formData.get('negative') ?? 0),
      Recommendations: Number(formData.get('recommendations') ?? 0),
      'Average playtime forever': Number(
        formData.get('average_playtime_forever') ?? 0
      ),
      'Average playtime two weeks': Number(
        formData.get('average_playtime_two_weeks') ?? 0
      ),
      'Median playtime forever': Number(
        formData.get('median_playtime_forever') ?? 0
      ),
      'Median playtime two weeks': Number(
        formData.get('median_playtime_two_weeks') ?? 0
      ),
      Genres: formData.getAll('genres').join(', '),
      '+15': formData.get('over_15') === 'on'
    }
    console.log(request)
    try {
      const response = await postPrediction(request)
      console.log(response)
      // Handle the response as needed
      setResponse(response)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className='fixed inset-0 w-full bg-black bg-opacity-50 flex justify-center items-center z-[200]'>
      <div className='relative bg-dark p-6 rounded-lg shadow-lg  mx-auto '>
        <button
          onClick={onClose}
          className='absolute top-2 right-5 text-gray-500 hover:text-gray-700 text-5xl'
        >
          &times;
        </button>
        <h4 className='font-bold mb-4 text-center underline underline-offset-2'>Make a Prediction</h4>
        <form
          onSubmit={handleSubmit}
          className='w-full flex gap-3'
          method='post'
          noValidate={false}
        >
          {/* First Column */}
          <div className='flex flex-col gap-5'>
            {/* Release date */}
            <div>
              <label className='text-gray font-medium text-gray-700'>
                Realease date
              </label>
              <input
                required
                type='date'
                name='release_date'
                className='mt-1 w-full shadow-sm border-gray-300 rounded-md text-secondary'
              />
            </div>
            {/* Peak CCU */}
            <div>
              <label className='text-gray font-medium text-gray-700'>
                Peak CCU
              </label>
              <input
                required
                type='number'
                name='peak_ccu'
                className='mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-secondary'
              />
            </div>
            {/* Price */}
            <div>
              <label className='text-gray font-medium text-gray-700'>Price</label>
              <input
                required
                type='number'
                step='0.01'
                name='price'
                className='mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-secondary'
              />
            </div>
            {/* DLC count */}
            <div>
              <label className='text-gray font-medium text-gray-700'>
                DLC count
              </label>
              <input
                type='number'
                name='dlc_count'
                className='mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-secondary'
              />
            </div>
            {/* Platforms */}
            <div>
              <label className='text-gray font-medium text-gray-700'>
                Platforms
              </label>
              <div className='mt-1'>
                <div className='flex items-center'>
                  <input
                    id='windows'
                    name='windows'
                    type='checkbox'
                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                  />
                  <label
                    htmlFor='windows'
                    className='ml-2  text-sm text-gray-700'
                  >
                    Windows
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    id='mac'
                    name='mac'
                    type='checkbox'
                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                  />
                  <label htmlFor='mac' className='ml-2  text-sm text-gray-700'>
                    Mac
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    id='linux'
                    name='linux'
                    type='checkbox'
                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                  />
                  <label
                    htmlFor='linux'
                    className='ml-2  text-sm text-gray-700'
                  >
                    Linux
                  </label>
                </div>
              </div>
            </div>
            {/* +15 */}
            <div>
              <label className=' text-gray font-medium text-gray-700'>+15?</label>
              <div className='mt-1'>
                <input
                  required
                  type='checkbox'
                  name='over_15'
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
              </div>
            </div>
          </div>
          {/* First Column */}
          {/* Supported languages */}
          <div>
            <label className='text-gray font-medium text-gray-700 '>
              Supported languages
            </label>
            <div className='mt-1 w-fit h-[600px] overflow-scroll no-scrollbar'>
              {languages.map(language => (
                <div key={language} className='flex items-center'>
                  <input
                    id={`language-${language}`}
                    name='supported_languages'
                    type='checkbox'
                    value={language}
                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                  />
                  <label
                    htmlFor={`language-${language}`}
                    className='ml-2  text-sm text-gray-700'
                  >
                    {language}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Second Column */}
          <div className='flex flex-col gap-5'>
            {/* Metacritic score */}
            <div>
              <label className='text-gray font-medium text-gray-700'>
                Metacritic score
              </label>
              <input
                type='number'
                name='metacritic_score'
                max='100'
                min='0'
                className='mt-1  w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-secondary'
              />
            </div>
            {/* User score */}
            <div>
              <label className='text-gray font-medium text-gray-700'>
                User score
              </label>
              <input
                type='number'
                name='user_score'
                max='10'
                min='0'
                step='0.1'
                className='mt-1  w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-secondary'
              />
            </div>
            {/* Achievements */}
            <div>
              <label className='text-gray font-medium text-gray-700'>
                Achievements
              </label>
              <input
                type='number'
                name='achievements'
                className='mt-1  w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-secondary'
              />
            </div>
          </div>
          {/* Thir colum */}
          <div className='flex flex-col gap-5'>
            {/* Positive */}
            <div>
              <label className='text-gray font-medium text-gray-700'>
                Positive Reviews
              </label>
              <input
                type='number'
                name='positive'
                className='mt-1  w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-secondary'
              />
            </div>
            {/* Negative */}
            <div>
              <label className='text-gray font-medium text-gray-700'>
                Negative Reviews
              </label>
              <input
                type='number'
                name='negative'
                className='mt-1  w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-secondary'
              />
            </div>
            {/* Recommendations */}
            <div>
              <label className='text-gray font-medium text-gray-700'>
                Recommendations
              </label>
              <input
                type='number'
                name='recommendations'
                className='mt-1  w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-secondary'
              />
            </div>
            {/* Average playtime forever */}
            <div>
              <label className='text-gray font-medium text-gray-700'>
                Average playtime forever
              </label>
              <input
                type='number'
                name='average_playtime_forever'
                className='mt-1  w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-secondary'
              />
            </div>
            {/* Average playtime two weeks */}
            <div>
              <label className='text-gray font-medium text-gray-700'>
                Average playtime two weeks
              </label>
              <input
                type='number'
                name='average_playtime_two_weeks'
                className='mt-1  w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-secondary'
              />
            </div>
            {/* Median playtime forever */}
            <div>
              <label className='text-gray font-medium text-gray-700'>
                Median playtime forever
              </label>
              <input
                type='number'
                name='median_playtime_forever'
                className='mt-1  w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-secondary'
              />
            </div>
            {/* Median playtime two weeks */}
            <div>
              <label className='text-gray font-medium text-gray-700'>
                Median playtime two weeks
              </label>
              <input
                type='number'
                name='median_playtime_two_weeks'
                className='mt-1  w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-secondary'
              />
            </div>
          </div>
          {/* Genres */}
          <div>
            <label className='text-gray font-medium text-gray-700'>Genres</label>
            <div className='mt-1 w-fit h-[600px] overflow-scroll no-scrollbar'>
              {genres.map(genre => (
                <div key={genre} className='flex items-center'>
                  <input
                    id={`genre-${genre}`}
                    name='genres'
                    type='checkbox'
                    value={genre}
                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                  />
                  <label
                    htmlFor={`genre-${genre}`}
                    className='ml-2  text-sm text-gray-700'
                  >
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <div className='flex flex-col items-center gap-5'>
            <button
              type='submit'
              className='mt-4 px-4 py-2 bg-indigo-600 text-gray rounded hover:text-light hover:opacity-85 transition-all duration-500 ease-in-out'
            >
              Submit
            </button>
            {response && (
              <p className='text-primary font-bold text-center'>
                {response.data}
                <p className='text-light'>Estimated Owners</p>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
