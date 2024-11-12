// FILE: Card.tsx
import { useState } from 'react'
import type { GameSpy } from '../types/steamGameSpy'
import { Modal } from './Modal'
import { getScore, getStylesScore } from '../const/steam'

export const Card = ({ game }: { game: GameSpy }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [score] = useState(getScore(game.positive, game.negative))

  function handleModal () {
    setIsModalOpen(true)
  }

  return (
    <div>
      <div
        className='select-none w-fit group drop-shadow-lg hover:z-50 transition-transform duration-500 ease-in-out relative'
        onClick={handleModal}
      >
        <div className='overflow-hidden w-[250px]  h-[150px]  rounded-md'>
          <img
            className='w-full h-full object-cover aspect-video transition-all duration-700 ease-in-out  group-hover:scale-100 scale-105
          cursor-pointer filter grayscale-[35%] group-hover:grayscale-[85%] rounded-md group-hover:blur-[1.35px] group-hover:brightness-50'
            src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`}
            alt={game.name}
          />
        </div>
        <div className='w-full transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 flex flex-col absolute top-0 px-2 py-1 justify-between h-full pointer-events-none'>
          <div className='w-full flex gap-5 justify-between items-start'>
            <h5 className='font-semibold text-balance'>{game.name} </h5>
            <p
              className={`w-fit h-fit px-1 py-1 text-dark
              rounded-md text-body-14
              ${getStylesScore(score)}`}
            >
              {score.toPrecision(2)}
            </p>
          </div>
          <div className='flex justify-between w-full gap-5'>
            <span className='px-1 w-fit rounded-sm font-bold text-green-500 bg-secondary'>
              {game.price !== '0'
                ? new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(Number(game.price) / 100.0)
                : 'Free'}
            </span>
            <span className='line-clamp-1 text-primary'>
              {game.publisher?.split(',')[0]}
            </span>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        game={game}
        score={score}
      />
    </div>
  )
}
