
const fileReader = require('../../utils/fileReader')

async function start() {
  const fl = await fileReader('./input.txt')
  // 1. 先分出左右兩邊的數字
  // 2. 遍歷右邊的陣列並列出map表 (key: 數字, value: 出現次數)
  // 3. 遍歷左邊的陣列，並將每個數字與map表比對，若有出現則乘以出現次數，並加總

  let leftArray = []
  let rightArray = []
  for await (const line of fl) {
    let numbers = line.trim().split('   ')
    let left = parseInt(numbers[0].trim())
    let right = parseInt(numbers[1].trim())
    leftArray.push(left)
    rightArray.push(right)
  }
  let rightMap = new Map()
  rightArray.forEach((num) => {
    if (rightMap.has(num)) {
      rightMap.set(num, rightMap.get(num) + 1)
    } else {
      rightMap.set(num, 1)
    }
  })
  let sum = 0
  leftArray.forEach((num) => {
    if (rightMap.has(num)) {
      sum += num * rightMap.get(num)
    }
  })



  console.log('Total score:', sum)
}

start()