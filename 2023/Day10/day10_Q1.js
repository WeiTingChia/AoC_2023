
const fileReader = require('../utils/fileReader')

async function start(inputPath) {

  const rl = await fileReader(inputPath)

  const dataArray = []
  for await (const line of rl) {
    dataArray.push([...line.trim().split('')])
  }

  const rowLength = dataArray.length
  const colLength = dataArray[0].length
  let sr = 0
  let sc = 0

  // find the S position and replace to the correct symbol
  let sd = 0
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      if (dataArray[i][j] === 'S') {
        sr = i
        sc = j
        up_valid = ['|', '7', 'F'].includes(dataArray[i - 1][j])
        right_valid = ['-', '7', 'J'].includes(dataArray[i][j + 1])
        down_valid = ['|', 'L', 'J'].includes(dataArray[i + 1][j])
        left_valid = ['-', 'L', 'F'].includes(dataArray[i][j - 1])
        if (up_valid && down_valid) {
          dataArray[i][j] = '|'
          sd = 0
        } else if (up_valid && right_valid) {
          dataArray[i][j] = 'L'
          sd = 0
        } else if (up_valid && left_valid) {
          dataArray[i][j] = 'J'
          sd = 0
        } else if (down_valid && right_valid) {
          dataArray[i][j] = 'F'
          sd = 2
        } else if (down_valid && left_valid) {
          dataArray[i][j] = '7'
          sd = 2
        } else if (right_valid && left_valid) {
          dataArray[i][j] = '-'
          sd = 1
        }
      }
    }
  }
  console.log(dataArray[sr][sc], sr, sc, sd)
  // up, right, down, left
  const DR = [-1, 0, 1, 0]
  const DC = [0, 1, 0, -1]
  let r = sr
  let c = sc
  let d = sd
  let dist = 0
  // find the path, have to record Last position and current position
  while (true) {
    dist += 1
    r += DR[d]
    c += DC[d]
    if (dataArray[r][c] === 'L') {
      if (d !== 2 && d !== 3) {
        break
      }
      else if (d === 2) {
        d = 1
      } else {
        d = 0
      }
    }

    if (dataArray[r][c] === 'J') {
      if (d !== 2 && d !== 1) {
        break
      }
      else if (d === 2) {
        d = 3
      } else {
        d = 0
      }
    }

    if (dataArray[r][c] === '7') {
      if (d !== 1 && d !== 0) {
        break
      }
      else if (d === 0) {
        d = 3
      } else {
        d = 2
      }
    }


    if (dataArray[r][c] === 'F') {
      if (d !== 0 && d !== 3) {
        break
      } else if (d === 0) {
        d = 1
      } else {
        d = 2
      }
    }

    if (dataArray[r][c] === '.') {
      break
    }
    if (r === sr && c === sc) {
      console.log(`Step: ${dist / 2}`)
      break
    }

  }

}
start('./input.txt')