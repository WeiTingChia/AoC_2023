
const fileReader = require('../utils/fileReader')

async function start(inputPath) {

  const rl = await fileReader(inputPath)

  const input = { row: [], data: [] }
  for await (const line of rl) {
    const [dots, blocks] = line.split(' ')

    input.row.push(dots)
    input.data.push([...blocks.split(',')])
  }

  console.log(input)
}
// i == current position within dots
// bi == current position within blocks
// current == length of current block of '#'
function f(dots, blocks, i, bi, current) {
  if (i === dots.length) {
    if (bi === blocks.length && current === 0) {
      return 1
    } else if (bi === blocks.length - 1 && blocks[bi] === current) {
      return 1
    } else {
      return 0
    }
  }
  let ans = 0


}
start('./input_test.txt')