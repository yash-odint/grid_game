import Tile from './Tile'
import '../styles/grid.css'

function Grid({ tiles, onTileClick }) {
  return (
    <section className="grid-container">
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          tile={tile}
          onClick={onTileClick}
        />
      ))}
    </section>
  )
}

export default Grid