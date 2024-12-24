const fileReader = require('../utils/fileReader')

async function start(inputPath) {
  const rl = await fileReader(inputPath)

  const matrix = []
  for await (const line of rl) {
    const eachLine = [...line]
    matrix.push(eachLine)

  }

  // console.log(matrix)
  main(matrix)

}

function main(matrix) {
  const R = matrix.length
  const C = matrix[0].length
  let ans = 0
  for (let rowIndex = 0; rowIndex < R; rowIndex++) {
    n = 0
    has_part = false
    negative = false
    let nums = []
    for (let colIndex = 0; colIndex < C; colIndex++) {

      if (!isNaN(Number(matrix[rowIndex][colIndex]))) {
        n = n * 10 + Number(matrix[rowIndex][colIndex])
        for (let row = -1; row <= 1; row++) {
          for (let col = -1; col <= 1; col++) {
            if (0 <= rowIndex + row && rowIndex + row < R && 0 <= colIndex + col && colIndex + col < C) {
              let ch = matrix[rowIndex + row][colIndex + col]
              if (isNaN(Number(ch)) && ch !== '.') {
                has_part = true
              }
            }
          }
        }
      }
      else if (n > 0) {
        if (negative) {
          n = n * -1
          console.log('NegativeNumber', n)
        }
        if (has_part) {
          ans += n
        }
        nums.push(n)
        console.log(n, has_part)
        n = 0;
        has_part = false
        negative = false

      }
      else {
        negative = false
      }
      // if (colIndex < C && matrix[rowIndex][colIndex] === '-') {
      //   negative = true
      // }
      if (n > 0 && colIndex == C - 1) {
        if (negative) {
          n = n * -1
        }
        if (has_part) {
          ans += n
        }
        nums.push(n)
        console.log(n, has_part)
        n = 0;
        has_part = false
        negative = false

      }


    }
    console.log(nums)
    console.log(`Sum so far:${ans}`)
    nums = []

  }
  console.log(ans)
}




start('./input.txt')