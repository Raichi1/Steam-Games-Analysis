import { useEffect, useState } from 'react'
import type { GameSpy } from '../types/steamGameSpy'
import { getGameByGenre, getTopGames } from '../services/steam'
import { Card } from './Card'
import { Loading } from './Loading'

const genresBase = [
  'Action',
  'Adventure',
  'Casual',
  'Massively',
  'Multiplayer',
  'RPG',
  'Simulation'
]
const SIZE = 100

export const AppGames = () => {
  const [games, setGames] = useState<GameSpy[]>([])
  const [genreSelected, setGenre] = useState<string>('null')
  const [loading, setLoading] = useState<boolean>(false)

  // function handle tags (genres)
  function handleClick (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const selected = e.currentTarget.textContent!
    if (selected === genreSelected) {
      setGenre('null')
      return
    }
    setGenre(selected)
  }

  useEffect(() => {
    setLoading(true)
    if (genreSelected === 'null')
      getTopGames(SIZE).then(response => {
        setGames(response)
        setLoading(false)
      })
    else {
      getGameByGenre(genreSelected, SIZE).then(response => {
        setGames(response)
        setLoading(false)
      })
    }
  }, [genreSelected])
  return (
    <section className='flex flex-col gap-5'>
      <header className='flex w-full justify-between'>
        <h2>Steam Users Predictor</h2>
        <section className='flex wrap gap-2 justify-end items-center'>
          {genresBase.map(genre => {
            return (
              <button
                key={genre}
                className={`w-fit h-[25px]  px-2 rounded-md  transition-colors duration-500 ease-in-out 
                  ${
                    genreSelected === genre
                      ? 'bg-primary hover:bg-red-500'
                      : 'bg-secondary hover:bg-primary'
                  } `}
                onClick={handleClick}
              >
                {genre}
              </button>
            )
          })}
        </section>
      </header>
      <main className='flex gap-5 flex-wrap justify-center w-[1650px]'>
        {loading ? (
          <Loading />
        ) : (
          games.map(game => <Card key={game.appid} game={game} />)
        )}
      </main>
    </section>
  )
}
