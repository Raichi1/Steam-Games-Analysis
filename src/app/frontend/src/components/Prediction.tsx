import { useEffect, useState } from 'react'
import type { GameInfo } from '../types/steamGameInfo'
import type { GameSpy } from '../types/steamGameSpy'
import { getPredictions } from '../services/steam'
import type { ResponseModel } from '../types/model'

interface ModalProps {
  gameinfo?: GameInfo
  gamespy?: GameSpy
}

export const Prediction: React.FC<ModalProps> = ({ gameinfo , gamespy}) => {
  const [predictions, setPredictions] = useState<ResponseModel>()
  useEffect(() => {
    if (!gameinfo || !gamespy) return
    getPredictions(gameinfo!, gamespy!).then(data => {
      setPredictions(data)
    })
  }, [gameinfo, gamespy])
  return (
    <div>
      <p>{predictions?.data}</p>
      <p>{predictions?.success ? 'Success' : 'Failed'}</p>
      <p>{predictions?.message}</p>
    </div>
  )
}
