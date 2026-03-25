import React from 'react'
import { useSong } from '../hooks/useSong'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'


const Home = () => {

  const { handleGetSong } = useSong()

  return (
    <div>
      <FaceExpression onClick={(expression) => { handleGetSong({ mood: expression }) }} />
      <Player />
    </div>
  )
}

export default Home