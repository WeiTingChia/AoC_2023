const fileReader = require('../../utils/fileReader')

async function start() {
  const fl = await fileReader('./input.txt')
  const matrix = []
  let width = 0
  let height = 0

  for await (const line of fl) {
    matrix.push(line)
  }
  width = matrix[0].length
  height = matrix.length

  let x = 0
  let y = 0
  let direction = 'up'
  let step = new Set()

  const initPosition = findInitialPosition(matrix)
  x = initPosition[0]
  y = initPosition[1]

  console.log('Initial position:', x, y, matrix[y][x])

  while (x >= 0 && x < width && y >= 0 && y < height) {
    console.log('Current position:', direction, x, y, matrix[y][x])
    if (matrix[y][x] === '#') {
      [x, y] = back(direction, x, y)
      direction = turn(direction)
    } else {
      if (!step.has([x, y].toString())) {
        step.add([x, y].toString())
      }
    }
    [x, y] = move(direction, x, y)
  }

  console.log('Final position:', x, y, step.size)
}

function back(direction, x, y) {
  switch (direction) {
    case 'up':
      return [x, y + 1]
    case 'right':
      return [x - 1, y]
    case 'down':
      return [x, y - 1]
    case 'left':
      return [x + 1, y]
    default:
      break;
  }
}

function turn(direction) {
  switch (direction) {
    case 'up':
      return 'right'
    case 'right':
      return 'down'
    case 'down':
      return 'left'
    case 'left':
      return 'up'
    default:
      break;
  }
}

function move(direction, x, y) {
  switch (direction) {
    case 'up':
      return [x, y - 1]
    case 'right':
      return [x + 1, y]
    case 'down':
      return [x, y + 1]
    case 'left':
      return [x - 1, y]
    default:
      break;
  }
}
function findInitialPosition(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === '^') {
        return [j, i]
      }
    }
  }
}

start()