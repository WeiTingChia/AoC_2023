
const fileReader = require('../../utils/fileReader')

let width, height
let matrix = []

async function start() {
  const fl = await fileReader('./input.txt')
  let XMAS_Count = 0
  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
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
      for (let direction of directions) {
        if (checkValidXMAS(i, j, direction[0], direction[1], 'XMAS')) {
          XMAS_Count++
        }
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