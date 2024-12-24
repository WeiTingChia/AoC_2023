
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

  // find the S position and direction
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

  // expand input 3 times
  let r2 = rowLength * 3
  let c2 = colLength * 3
  let g2 = []
  for (let i = 0; i < r2; i++) {
    let row = []
    for (let j = 0; j < c2; j++) {
      row.push('.')
    }
    g2.push(row)
  }


  for (let r = 0; r < rowLength; r++) {
    for (let c = 0; c < colLength; c++) {
      if (dataArray[r][c] === '|') {
        g2[3 * r + 0][3 * c + 1] = '*'
        g2[3 * r + 1][3 * c + 1] = '*'
        g2[3 * r + 2][3 * c + 1] = '*'
      } else if (dataArray[r][c] === '-') {
        g2[3 * r + 1][3 * c + 0] = '*'
        g2[3 * r + 1][3 * c + 1] = '*'
        g2[3 * r + 1][3 * c + 2] = '*'
      } else if (dataArray[r][c] === '7') {
        g2[3 * r + 1][3 * c + 0] = '*'
        g2[3 * r + 1][3 * c + 1] = '*'
        g2[3 * r + 2][3 * c + 1] = '*'
      } else if (dataArray[r][c] === 'F') {
        g2[3 * r + 2][3 * c + 1] = '*'
        g2[3 * r + 1][3 * c + 1] = '*'
        g2[3 * r + 1][3 * c + 2] = '*'
      } else if (dataArray[r][c] === 'J') {
        g2[3 * r + 1][3 * c + 0] = '*'
        g2[3 * r + 1][3 * c + 1] = '*'
        g2[3 * r + 0][3 * c + 1] = '*'
      } else if (dataArray[r][c] === 'L') {
        g2[3 * r + 0][3 * c + 1] = '*'
        g2[3 * r + 1][3 * c + 1] = '*'
        g2[3 * r + 1][3 * c + 2] = '*'
      } else if (dataArray[r][c] === '.') {
        continue
      }
    }
  }
  g2.forEach(x => {
    console.log(x.join(''))
  })

  let Q = []
  const SEEN = new Set()
  // edge
  for (let r = 0; r < r2; r++) {
    Q.push([r, 0])
    Q.push([r, c2 - 1])
  }
  for (let c = 0; c < c2; c++) {
    Q.push([0, c])
    Q.push([r2 - 1, c])
  }
  // flood fill from edge
  while (Q.length !== 0) {
    const el = Q[0]
    const r = el[0]
    const c = el[1]
    Q.splice(0, 1)
    if (SEEN.has(JSON.stringify([r, c]))) {
      continue
    }
    if (r < 0 || r >= r2 || c < 0 || c >= c2) {
      continue
    }
    SEEN.add(JSON.stringify([r, c]))
    if (g2[r][c] === '*') {
      continue
    }
    for (let d = 0; d < 4; d++) {
      Q.push([r + DR[d], c + DC[d]])
    }
  }
  // 以原始maze對應expanded maze 計算沒被水淹到的單位有多少
  let ans = 0
  for (let r = 0; r < rowLength; r++) {
    for (let c = 0; c < colLength; c++) {
      let seen = false
      for (let rr = 0; rr < 3; rr++) {
        for (let cc = 0; cc < 3; cc++) {
          console.log(3 * r + rr, 3 * c + cc)
          if (SEEN.has(JSON.stringify([3 * r + rr, 3 * c + cc]))) {
            seen = true
          }
        }
      }
      if (!seen) ans = ans + 1
    }
  }
  console.log(ans)
}
start('./input.txt')