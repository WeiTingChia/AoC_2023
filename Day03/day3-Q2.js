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
  let nums = {}
  for (let rowIndex = 0; rowIndex < R; rowIndex++) {
    gears = new Set()
    n = 0
    has_part = false
    negative = false
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
              if (ch === '*') {
                gears.add(`(${rowIndex + row}, ${colIndex + col})`)
              }
            }
          }
        }
      }
      else if (n > 0) {
        // console.log(gears)
        gears.forEach(gear => {
          if (nums[gear]) {
            nums[gear].push(n)
          }
          else {
            nums[gear] = [n]
          }
        })
        n = 0;
        has_part = false
        negative = false
        gears = new Set()
      }
      if (n > 0 && colIndex == C - 1) {
        gears.forEach(gear => {
          if (nums[gear]) {
            nums[gear].push(n)
          }
          else {
            nums[gear] = [n]
          }
        })
        n = 0;
        has_part = false
        negative = false
      }


    }
    // console.log(nums)
  }
  let ans2 = 0;
  console.log(nums)
  for (const key in nums) {
    const element = nums[key];
    if (element.length === 2) {
      ans2 += element[0] * element[1]
    }
  }
  console.log(ans2)
}




start('./input.txt')