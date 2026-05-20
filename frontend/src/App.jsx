import { useEffect, useState } from 'react'

import Grid from './components/Grid'
import { socket } from './socket'

import './styles/app.css'

function App() {
  const [tiles, setTiles] = useState([])
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // get current user socket id when connects
    socket.on('connect', () => {
      setCurrentUserId(socket.id)
    })
    // Receive initial grid from server
    socket.on('initial_grid', (serverGrid) => {
      setTiles(serverGrid)
    })

    // Receive live tile updates
    socket.on('tile_claimed', ({ tileId, owner, color }) => {
      setTiles((currentTiles) =>
        currentTiles.map((tile) =>
          tile.id === tileId
            ? { ...tile, owner, color }
            : tile
        )
      )
    })

    socket.on('tile_unclaimed', ({ tileId, owner, color }) => {
      setTiles((currentTiles) =>
        currentTiles.map((tile) =>
          tile.id === tileId
            ? { ...tile, owner, color }
            : tile
        )
      )
    })

    // Cleanup listeners
    return () => {
      socket.off('initial_grid')
      socket.off('tile_claimed')
    }
  }, [])

  function handleTileClick(tileId) {

    const tile = tiles.find((t) => t.id == tileId);

    if(tile.owner === currentUserId){
      socket.emit("unclaim_tile", tileId);
      return;
    }
    
    if(!tile.owner){
      socket.emit('claim_tile', tileId)
    }
  }

  return (
    <main className="app-container">
      <h1 className="title">
        Real-Time Shared Grid
      </h1>

      <Grid
        tiles={tiles}
        onTileClick={handleTileClick}
      />
    </main>
  )
}

export default App