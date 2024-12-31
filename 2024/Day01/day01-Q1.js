
const fileReader = require('../../utils/fileReader')

async function start() {
  const fl = await fileReader('./input.txt')
  // 1. 先分出左右兩邊的數字，並排序
  // 2. 用for-loop 抓出相對應的index 相減取絕對值，並加總
  // 3. 輸出結果
  let leftArray = []
  let rightArray = []
  for await (const line of fl) {
    let numbers = line.trim().split('   ')
    let left = parseInt(numbers[0].trim())
    let right = parseInt(numbers[1].trim())
    leftArray.push(left)
    rightArray.push(right)
  }
  leftArray.sort((a, b) => a - b)
  rightArray.sort((a, b) => a - b)
  let sum = 0
  for (let i = 0; i < leftArray.length; i++) {
    // console.log(leftArray[i], rightArray[i])
    sum += Math.abs(leftArray[i] - rightArray[i])
  }




  console.log('Total score:', sum)
}

start()