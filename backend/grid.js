function createGrid(size = 400) {
  return Array.from({ length: size }, (_, index) => ({
    id: index,
    owner: null,
  }))
}

const grid = createGrid()

module.exports = {
  grid,
}