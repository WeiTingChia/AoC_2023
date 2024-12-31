
const fileReader = require('../../utils/fileReader')
function isSafeDiffer(left, right) {
  const differ = Math.abs(left - right)
  return (differ <= 3 && differ > 0)
}
function isIncrease(left, right) {
  return left < right
}

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
    for (let i = 0; i < numbers.length; i++) {
      if (i === 0) {
        isIncreaseLast = isIncrease(parseInt(numbers[i]), parseInt(numbers[i + 1]))
      } else {
        if (isIncrease(parseInt(numbers[i]), parseInt(numbers[i + 1])) !== isIncreaseLast) {
          break
        }
      }
      if (isSafeDiffer(parseInt(numbers[i]), parseInt(numbers[i + 1]))) {
        isSafeCount++
      }
    }
    if (isSafeCount === numbers.length - 1) {
      console.log('original safe:', numbers)
      safeArray++
    } else {
      if (checkIfRemoveOneIsSafe(numbers)) {
        console.log('safe:', numbers)
        safeArray++
      } else {
        console.log('not safe:', numbers)
      }
    }


  }




  console.log('Total score:', safeArray)
}

start()

function checkIfRemoveOneIsSafe(numbers) {
  let isIncreaseLast = true
  for (let j = 0; j < numbers.length; j++) {
    let numbersArray = [...numbers]
    numbersArray.splice(j, 1)
    let isSafeCount = 0
    for (let i = 0; i < numbersArray.length; i++) {

      if (i === 0) {
        isIncreaseLast = isIncrease(parseInt(numbersArray[i]), parseInt(numbersArray[i + 1]))
      } else {
        if (isIncrease(parseInt(numbersArray[i]), parseInt(numbersArray[i + 1])) !== isIncreaseLast) {
          break
        }
      }

      if (isSafeDiffer(parseInt(numbersArray[i]), parseInt(numbersArray[i + 1]))) {
        isSafeCount++
      }

    }
    if (isSafeCount === numbers.length - 2) {
      console.log('isSafeCount:', isSafeCount, numbersArray)
      return true
    }

  }
  return false
}