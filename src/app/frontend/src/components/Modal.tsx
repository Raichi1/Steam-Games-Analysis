import React, { useEffect, useState } from 'react'
import { type GameInfo } from '../types/steamGameInfo'
import { getGameInfo } from '../services/steam'
import { Loading } from './Loading'
import { SimilarGames } from './SimilarGames'
import { Prediction } from './Prediction'
import type { GameSpy } from '../types/steamGameSpy'
import { getStylesScore } from '../const/steam'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  game: GameSpy
  score: number
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  game,
  score
}) => {
  const [gameInfo, setGameInfo] = useState<GameInfo>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      getGameInfo(game.appid!).then(response => {
        setGameInfo(response)
        setIsLoading(false)
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[200]'>
      <div className='relative bg-dark p-6 rounded-lg shadow-lg w-[1250px] h-[750px] mx-auto'>
        <img
          src={gameInfo?.background}
          alt={gameInfo?.name}
          className='absolute top-0 left-0 h-full p-0 m-0'
        />
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          &times;
        </button>
        {isLoading ? (
          <Loading />
        ) : (
          <main className='flex gap-5 relative'>
            <section className='w-[55%] flex flex-col gap-2'>
              <p className='text-2xl font-bold text-center flex justify-between'>
                {gameInfo?.name}
                <span
                  className={`w-fit h-fit px-1 text-dark
              rounded-md text-body-14
              ${getStylesScore(score)}`}
                >
                  {score.toPrecision(2)}
                </span>
              </p>
              <div className='overflow-hidden w-full h-[300px]  rounded-md'>
                <img
                  src={gameInfo?.header_image}
                  alt={gameInfo?.name}
                  className='w-full h-full object-cover transition-all duration-1000 ease-in-out hover:scale-100 scale-110
                    filter grayscale-[40%] hover:grayscale-[25%]'
                />
              </div>
              <p className='text-gray-500 text-body-16 mt-2'>
                {gameInfo?.short_description}
              </p>

              {/* Price */}
              <div className='flex items-center justify-start gap-3 mt-2'>
                <span className='text-gray-500 text-body-14'>Price:</span>
                <span className='text-primary text-body-14'>
                  {game.price !== '0'
                    ? new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(Number(game.price) / 100.0)
                    : 'Free to Play'}
                </span>
              </div>
              <div className='flex gap-3 mt-2'>
                {gameInfo?.genres?.map(genre => (
                  <span
                    key={genre.id}
                    className='text-dark text-body-14 bg-primary px-2 hover:bg-secondary hover:text-primary select-none rounded-md
                    transition-colors duration-300 ease-in-out'
                  >
                    {genre.description}
                  </span>
                ))}
              </div>
              {/* Prediction */}
              <Prediction gameinfo={gameInfo} />
            </section>
            <SimilarGames gameInfo={gameInfo!} />
          </main>
        )}
      </div>
    </div>
  )
}
