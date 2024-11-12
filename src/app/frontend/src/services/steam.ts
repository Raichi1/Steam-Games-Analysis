import type { ResponseModel } from '../types/model'
import type { GameInfo } from '../types/steamGameInfo'
import type { GameSpy } from '../types/steamGameSpy'

const URL_API = 'http://192.168.18.4:5000/api'
// const URL_SPY = 'https://steamspy.com/api.php?request=appdetails&appid='

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

export const getPredictions = async (
  gameInfo: GameInfo
): Promise<ResponseModel> => {
  const response = await fetch(`${URL_API}/game/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameInfo)
  })
  if (!response.ok) {
    const errorText = await response.text()
    console.error('Error response:', errorText)
    throw new Error('Network response was not ok')
  }
  return response.json()
}
