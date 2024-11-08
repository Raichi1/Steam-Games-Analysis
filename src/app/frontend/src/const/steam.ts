export const API_STEAM_INFO = (
  appid: number | string,
  language: string = 'spanish'
) =>
  `https://store.steampowered.com/api/appdetails?appids=${appid}&l=spanish&cc=PE`
