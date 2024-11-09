import { useEffect, useState } from 'react'
import type { GameInfo } from '../types/steamGameInfo'
import { getPredictions } from '../services/steam'
import type { ResponseModel } from '../types/model'

interface ModalProps {
  gameinfo?: GameInfo
}

export const Prediction: React.FC<ModalProps> = ({ gameinfo }) => {
  const [predictions, setPredictions] = useState<ResponseModel>()
  useEffect(() => {
    if (!gameinfo) return
    getPredictions(gameinfo!).then(data => {
      setPredictions(data)
    })
  }, [gameinfo])
  return (
    <div>
      <p>{predictions?.data}</p>
      <p>{predictions?.success ? 'Success' : 'Failed'}</p>
      <p>{predictions?.message}</p>
    </div>
  )
}
