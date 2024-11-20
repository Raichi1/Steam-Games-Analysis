import type { RequestModel, ResponseModel } from '../types/model'
import type { GameInfo } from '../types/steamGameInfo'
import type { GameSpy } from '../types/steamGameSpy'

const URL_API = 'http://localhost:5000/api'
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

export const getGameSpy = async (id: number): Promise<GameSpy> => {
  return await fetch(`${URL_API}/spy/${id}`)
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
  gameInfo: GameInfo,
  gameSpy: GameSpy
): Promise<ResponseModel> => {
  const combinedData: RequestModel = {
    'Release date': gameInfo.release_date?.date,
    'Peak CCU': gameSpy.ccu,
    Price: Number(gameSpy.price) / 100,
    'Supported languages': gameSpy.languages,
    'DLC count': gameInfo?.dlc?.length || 0,
    Windows: gameInfo.platforms.windows,
    Mac: gameInfo.platforms.mac,
    Linux: gameInfo.platforms.linux,
    'Metacritic score': gameInfo.metacritic?.score || 0,
    'User score': gameSpy.userscore,
    Achievements: gameInfo.achievements?.total || 0,
    Positive: gameSpy.positive,
    Negative: gameSpy.negative,
    Recommendations: gameInfo.recommendations?.total || 0,
    'Average playtime forever': gameSpy.average_forever,
    'Average playtime two weeks': gameSpy.average_2weeks,
    'Median playtime forever': gameSpy.median_forever,
    'Median playtime two weeks': gameSpy.median_2weeks,
    Genres: gameSpy.genre,
    '+15': Number(gameInfo?.required_age) > 15
  }
  console.log(combinedData)
  // console.log(`Data : ${combinedData}`)

  const response = await fetch(`${URL_API}/game/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(combinedData)
  })
  if (!response.ok) {
    const errorText = await response.text()
    console.error('Error response:', errorText)
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const postPrediction = async (
  request: RequestModel
): Promise<ResponseModel> => {
  const response = await fetch(`${URL_API}/game/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })
  if (!response.ok) {
    const errorText = await response.text()
    console.error('Error response:', errorText)
    throw new Error('Network response was not ok')
  }
  return response.json()
}
