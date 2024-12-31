const fileReader = require('../../utils/fileReader')

async function start() {
  const fl = await fileReader('./input.txt')

  let safeArray = 0
  // 1. 先把前兩個數字相減，判斷是否小於等於3 & 大於0 -> 此功能可獨立成一個function
  // 2. 再以前兩個數字判斷此陣列為 增加或減少
  // 3. 遍歷後續的數字
  function isSafeDiffer(left, right) {
    const differ = Math.abs(left - right)
    return (differ <= 3 && differ > 0)
  }
  function isIncrease(left, right) {
    return left < right
  }
  for await (const line of fl) {
    let numbers = line.trim().split(' ')
    let isSafeCount = 0
    let isIncreaseLast = true
    for (let i = 0; i < numbers.length - 1; i++) {
      if (isSafeDiffer(parseInt(numbers[i]), parseInt(numbers[i + 1]))) {
        isSafeCount++
      }
      if (i === 0) {
        isIncreaseLast = isIncrease(parseInt(numbers[i]), parseInt(numbers[i + 1]))
      } else {
        if (isIncrease(parseInt(numbers[i]), parseInt(numbers[i + 1])) !== isIncreaseLast) {
          isSafeCount--
        }
      }
    }
    if (isSafeCount === numbers.length - 1) {
      safeArray++
    }

  }




  console.log('Total score:', safeArray)
}

start()