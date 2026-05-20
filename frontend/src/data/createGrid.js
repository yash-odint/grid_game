export function createGrid(size = 400) {
  return Array.from({ length: size }, (_, index) => ({
    id: index,
    owner: null,
  }))
}