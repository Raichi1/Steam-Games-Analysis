import type { Genre } from './steamGameInfo'

export interface ResponseModel {
  success: boolean
  message: string
  data: any
}

export interface RequestModel {
  'Peak CCU': number
  Price: number
  'DLC count': number
  Windows: boolean
  Mac: boolean
  Linux: boolean
  'Metacritic score': number
  'User score': number
  Achievements: number
  Positive: number
  Negative: number
  Recommendations: number
  'Average playtime forever': number
  'Average playtime two weeks': number
  'Median playtime forever': number
  'Median playtime two weeks': number
  genres?: Genre[]
}
