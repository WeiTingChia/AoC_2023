
const fileReader = require('../utils/fileReader')

async function start(inputPath) {

  const rl = await fileReader(inputPath)

  const dataArray = []
  for await (const line of rl) {
    dataArray.push([...line.trim().split('')])
  }
  dataArray.forEach(x => {
    console.log(x)
  })
}
//defined all symbol related to the map
start('./input_test_1.txt')