
const fileReader = require('../utils/fileReader')

async function start(inputPath) {

  const rl = await fileReader(inputPath)
  let directions = []
  let B = 0;
  for await (const line of rl) {
    const str = line.split('#')[1].split(')')[0]
    const direction = str.slice(str.length - 1, str.length)
    const steps = parseInt(str.slice(0, str.length - 1), 16)
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
    const x = directionTransformer(direction)
    if (x === 'R') area += y * steps
    else if (x === 'L') area -= y * steps
    else if (x === 'U') y += steps
    else if (x === 'D') y -= steps
  })
  return area;
}

function directionTransformer(str) {
  if (str === '0') return 'U'
  if (str === '1') return 'R'
  if (str === '2') return 'D'
  if (str === '3') return 'L'
}
start('./input.txt')