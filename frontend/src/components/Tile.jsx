import '../styles/tile.css'

function Tile({ tile, onClick }) {
  return (
    <button
      className="tile"
      style={{
        backgroundColor: tile.color || '#ffffff',
      }}
      onClick={() => onClick(tile.id)}
    />
  )
}

export default Tile