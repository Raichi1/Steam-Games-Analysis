export interface GameSpy {
  appid?: number
  average_2weeks?: number
  average_forever?: number
  ccu?: number
  developer?: string
  discount?: string
  initialprice?: string
  median_2weeks?: number
  median_forever?: number
  name?: string
  negative?: number
  owners?: string
  positive?: number
  price?: string
  publisher?: string
  score_rank?: string
  userscore?: number
}

export interface GameInfoSpy {
  appid?: number
  name?: string
  developer?: string
  publisher?: string
  score_rank?: string
  positive?: number
  negative?: number
  userscore?: number
  owners?: string
  average_forever?: number
  average_2weeks?: number
  median_forever?: number
  median_2weeks?: number
  price?: string
  initialprice?: string
  discount?: string
  ccu?: number
  languages?: string
  genre?: string
  tags?: { [key: string]: number }
}
