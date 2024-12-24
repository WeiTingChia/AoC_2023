
const fileReader = require('../utils/fileReader')

async function start(inputPath) {

  const rl = await fileReader(inputPath)

  const dataArray = []
  for await (const line of rl) {
    dataArray.push(line)
  }
  let count = 0
  let emptyRC = { row: [], col: [] }
  for (let i = 0; i < dataArray[0].length; i++) {
    emptyRC.col.push(i)
  }
  //find empty galaxies
  dataArray.forEach((line, rowIndex) => {
    if (!line.includes('#')) {
      emptyRC.row.push(rowIndex)
      return
    }
    Array.from(line).forEach((el, colIndex) => {
      if (el === '#' && emptyRC.col.includes(colIndex)) {
        let idx = emptyRC.col.indexOf(colIndex)
        emptyRC.col.splice(idx, 1)
      } else {
        return
      }
    })
  })
  // console.log(emptyRC)
  // find each # location
  let location = []
  dataArray.forEach((line, rowIndex) => {
    Array.from(line).forEach((el, colIndex) => {
      if (el == '#') {
        location.push([rowIndex, colIndex])
      }
    })
  })
  // console.log(location)
  //calculate the distance between each #
  let answer = 0
  const scale = 1000000
  for (let i = location.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      let dis = checkGapAmount(location[i][0], location[j][0], emptyRC.row, scale) + checkGapAmount(location[i][1], location[j][1], emptyRC.col, scale) + Math.abs(location[i][0] - location[j][0]) + Math.abs(location[i][1] - location[j][1])
      answer += dis
      // console.log(answer)
    }
  }
  console.log(`Answer: ${answer}`)
}
function checkGapAmount(location1, location2, gapArr, scale) {
  let idx1 = 0;
  let idx2 = 0
  for (let i = gapArr.length - 1; i >= 0; i--) {
    if (location1 > gapArr[i]) {
      idx1++
    }
    if (location2 > gapArr[i]) {
      idx2++
    }
  }
  // console.log(location1, location2, idx1, idx2)
  let result = Math.abs(idx1 - idx2)
  if (result === 0) {
    return result
  } else {
    return result * (scale - 1)
  }
}

start('./input.txt')

