import { useEffect, useState } from 'react'
import { type GameInfo } from '../types/steamGameInfo'
import type { GameSpy } from '../types/steamGameSpy'
import { getGameByGenre } from '../services/steam'
import { Card } from './Card'
import { Loading } from './Loading'

interface ModalProps {
  gameInfo: GameInfo
}

export const SimilarGames: React.FC<ModalProps> = ({ gameInfo }) => {
  const [similarGames, setSimilarGames] = useState<GameSpy[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    setLoading(true)
    // get random genre
    const genre =
      gameInfo?.genres?.[Math.floor(Math.random() * gameInfo.genres.length)]
        .description
    getGameByGenre(genre!).then(response => {
      setSimilarGames(response)
      setLoading(false)
    })
  }, [])

  return (
    <section className='w-[45%] '>
      <h2 className='text-xl font-bold text-center'>More like this</h2>
      <div className='flex gap-2 mt-2 flex-wrap items-center justify-center overflow-y-auto h-[650px] no-scrollbar'>
        {loading ? (
          <Loading />
        ) : (
          similarGames.map(game => (
            <Card key={game.appid + 'similar'} game={game} />
          ))
        )}
      </div>
    </section>
  )
}
