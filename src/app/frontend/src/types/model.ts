export interface ResponseModel {
  success: boolean
  message: string
  data: string
}

export interface RequestModel {
  'Release date': string
  'Peak CCU': number
  Price: number
  'DLC count': number
  'Supported languages': string
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
  Genres?: string
  '+15': boolean
}
