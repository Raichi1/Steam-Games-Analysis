export const API_STEAM_INFO = (
  appid: number | string,
  language: string = 'spanish'
) =>
  `https://store.steampowered.com/api/appdetails?appids=${appid}&l=spanish&cc=PE`

export function getScore (
  positive: number | undefined,
  negative: number | undefined
): number {
  if (positive && negative)
    return parseFloat((positive / (positive + (negative ?? 0))).toFixed(2))
  return 0.0
}

export function getStylesScore (score: number) {
  if (score >= 0.75) return 'bg-green-500'
  if (score >= 0.5) return 'bg-yellow-500'
  if (score >= 0.25) return 'bg-red-500'
  return 'bg-gray-500'
}
