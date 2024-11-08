// FILE: Card.tsx
import { useState } from 'react'
import type { GameSpy } from '../types/steamGameSpy'
import { Modal } from './Modal'

export const Card = ({ game }: { game: GameSpy }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleModal () {
    setIsModalOpen(true)
  }

  return (
    <div>
      <div
        className='select-none w-fit group drop-shadow-lg hover:scale-110 hover:z-50 transition-transform duration-500 ease-in-out relative'
        onClick={handleModal}
      >
        <img
          className='h-[150px] w-[250px] object-cover aspect-video  transition-all duration-500 ease-in-out 
          cursor-pointer filter grayscale-[35%] group-hover:grayscale-[85%] rounded-md group-hover:blur-[1.35px] group-hover:brightness-50'
          src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`}
          alt={game.name}
        />
        <div className='hidden group-hover:flex flex-col absolute top-0 px-2 py-1 justify-evenly h-full pointer-events-none'>
          <h5>{game.name}</h5>
          <p className='w-full text-primary'>{game.publisher?.split(',')[0]}</p>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gameid={game.appid}
      />
    </div>
  )
}
