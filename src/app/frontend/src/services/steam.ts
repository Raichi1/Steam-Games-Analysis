import type { GameInfo } from '../types/steamGameInfo'
import type { GameSpy } from '../types/steamGameSpy'

const URL_API = 'http://localhost:5000/api'

export const getTopGames = async (n: number = 10): Promise<GameSpy[]> => {
  return await fetch(`${URL_API}/game/top?n=${n}`)
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const getGameInfo = async (id: number): Promise<GameInfo> => {
  return await fetch(`${URL_API}/game/${id}`)
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const getGameByGenre = async (
  genre: string,
  n: number = 10
): Promise<GameSpy[]> => {
  const parsedGenre = decodeURIComponent(genre)
  return await fetch(`${URL_API}/game/genre?genre=${parsedGenre}&n=${n}`)
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const getPredictions = async (game: GameInfo): Promise<Response> => {
  return await fetch(`${URL_API}/game/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(game)
  })
}
