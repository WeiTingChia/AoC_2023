
const fileReader = require('../utils/fileReader')

async function start(inputPath) {

  const rl = await fileReader(inputPath)
  let directions = []
  let B = 0;
  for await (const line of rl) {

    const [direction, steps, _] = line.split(' ')
    B += Number(steps)
    directions.push([direction, Number(steps)])

  }
  // Pick's Theorem: A = I + (B/2) - 1
  // I = A - (B/2) + 1
  // ans: I + B = A + (B/2) + 1 
  const A = areaGreen(directions)

  const ans = A + (B / 2) + 1
  console.log(A, B)
  console.log(ans)
  return


}

function areaGreen(directions) {
  // Green's Theorem
  let area = 0
  let y = 0
  directions.forEach(([direction, steps]) => {
    if (direction === 'R') area += y * steps
    else if (direction === 'L') area -= y * steps
    else if (direction === 'U') y += steps
    else if (direction === 'D') y -= steps
  })
  return area;
}

function directionTransformer(str) {
  if (str === 'U') return 0
  if (str === 'R') return 1
  if (str === 'D') return 2
  if (str === 'L') return 3
}
start('./input.txt')