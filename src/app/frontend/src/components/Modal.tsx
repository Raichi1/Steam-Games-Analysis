import React, { useEffect, useState } from 'react'
import { type GameInfo } from '../types/steamGameInfo'
import { getGameInfo } from '../services/steam'
import { Loading } from './Loading'
import { SimilarGames } from './SimilarGames'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  gameid?: number
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, gameid }) => {
  const [gameInfo, setGameInfo] = useState<GameInfo>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      // first fetch
      getGameInfo(gameid!).then(response => {
        setGameInfo(response)
        setIsLoading(false)
      })
    }
  }, [isOpen, gameid])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[200]'>
      <div className='relative bg-dark p-6 rounded-lg shadow-lg w-[1250px] h-[750px] mx-auto overflow-y-auto no-scrollbar'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          &times;
        </button>
        {isLoading ? (
          <Loading />
        ) : (
          <main className='flex gap-5'>
            <section className='w-[55%]'>
              <h1 className='text-2xl font-bold text-center'>
                {gameInfo?.name}
              </h1>
              <img
                src={gameInfo?.header_image}
                alt={gameInfo?.name}
                className='w-full h-[300px] object-cover rounded-md'
              />
              <p className='text-gray-500 text-body-16 mt-2'>
                {gameInfo?.short_description}
              </p>
              <div className='flex gap-3 mt-2'>
                {gameInfo?.genres?.map(genre => (
                  <span key={genre.id} className='text-primary text-body-14'>
                    {genre.description}
                  </span>
                ))}
              </div>
            </section>
            <SimilarGames gameInfo={gameInfo!} />
          </main>
        )}
      </div>
    </div>
  )
}
