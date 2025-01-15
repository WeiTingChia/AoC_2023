
const fileReader = require('../../utils/fileReader')

let width, height
let matrix = []

async function start() {
  const fl = await fileReader('./input.txt')
  let XMAS_Count = 0
  let directions = [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1]
  ]

  for await (const line of fl) {
    matrix.push(line)
    width = line.length
  }
  height = matrix.length


  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let diagonalCount = 0
      for (let direction of directions) {
        let diagonalDirection = direction
        let oppositeDirection = diagonalDirection.map(x => -x)
        let startingPointX = i + oppositeDirection[0]
        let startingPointY = j + oppositeDirection[1]
        if (checkValidXMAS(startingPointX, startingPointY, direction[0], direction[1], 'MAS')) {
          diagonalCount++
        }
      }
      if (diagonalCount === 2) {
        XMAS_Count++
      }
    }
  }

  console.log('Total score:', XMAS_Count)
}

function checkValidXMAS(startingPointX, startingPointY, directionX, directionY, word) {
  for (let characterIndex = 0; characterIndex < word.length; characterIndex++) {
    let positionX = startingPointX + (characterIndex * directionX)
    let positionY = startingPointY + (characterIndex * directionY)
    if (
      positionX < 0 || positionX >= width ||
      positionY < 0 || positionY >= height
      || matrix[positionY][positionX] !== word[characterIndex]
    ) {
      return false
    }
  }

  return true
}

start()