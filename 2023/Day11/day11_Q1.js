
const fileReader = require('../utils/fileReader')

async function start(inputPath) {

  const rl = await fileReader(inputPath)

  const dataArray = []
  for await (const line of rl) {
    dataArray.push(line)
  }
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
  //insert the additional row/col
  let newArray = []
  let newColLength = dataArray[0].length + emptyRC.col.length
  for (let j = 0; j < dataArray.length; j++) {
    let arr = [...dataArray[j]]
    for (let i = emptyRC.col.length - 1; i >= 0; i--) {
      arr.splice(emptyRC.col[i], 0, '.')
    }
    newArray.push(arr.join(''))

  }
  let str = ''
  for (let i = 0; i < newColLength; i++) {
    str += '.'
  }
  for (let i = emptyRC.row.length - 1; i >= 0; i--) {
    newArray.splice(emptyRC.row[i], 0, str)
  }
  //calculate the distance between each #
  let location = []
  newArray.forEach((line, rowIndex) => {
    Array.from(line).forEach((el, colIndex) => {
      if (el == '#') {
        location.push([rowIndex, colIndex])
      }
    })
  })
  let answer = 0
  let count2 = 0
  for (let i = location.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      count2++
      answer += Math.abs(location[i][0] - location[j][0]) + Math.abs(location[i][1] - location[j][1])
      // console.log(answer)
    }
  }
  console.log(`Answer: ${answer}`)
}

start('./input.txt')

