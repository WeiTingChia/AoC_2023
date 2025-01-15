const fileReader = require('../../utils/fileReader')

const operators = ['+', '*'];
async function start() {
  const fl = await fileReader('./input.txt')

  const testValue = []
  const numbers = []
  for await (const line of fl) {
    testValue.push(Number(line.split(':')[0]))

    numbers.push(line.split(':')[1].trim().split(' ').map(Number))
  }

  let sum = 0
  for (let i = 0; i < testValue.length; i++) {
    const test = testValue[i]
    const num = numbers[i]
    console.log('Num:', num)
    if (calculateEachCondition(num.slice(1), num[0], test)) {
      sum += test
    }
  }

  console.log('Final answer:', sum)
}
function calculateEachCondition(numArray, result, target) {
  if (numArray.length === 0) {
    return result === target
  }
  // left -> +
  // right -> *
  const left = calculateEachCondition(numArray.slice(1), result + numArray[0], target);
  const right = calculateEachCondition(numArray.slice(1), result * numArray[0], target);
  const middle = calculateEachCondition(numArray.slice(1), Number(result + '' + numArray[0]), target);
  return left || right || middle
}
start()