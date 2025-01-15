
const fileReader = require('../../utils/fileReader')

async function start() {
  const fl = await fileReader('./input.txt')
  const rulesMap = {}
  const answerArray = []

  for await (const line of fl) {
    createRuleMap(line, rulesMap)
    if (line.includes(',')) {
      let isCorrectOrder = true
      const numbers = line.split(',')
      console.log('Numbers:', numbers)

      // 每行的數字check
      for (let index = 0; index < numbers.length; index++) {
        const num = numbers[index]

        //Map中有這個key
        if (rulesMap[num]) {
          const restArray = numbers.slice(index, numbers.length)
          console.log(' . restArray:', restArray, num)
          for (let i = 1; i < restArray.length; i++) {
            console.log(' . . restArray[i]:', restArray[i])
            if (rulesMap[num].includes(restArray[i])) {
              isCorrectOrder = true
            } else {
              isCorrectOrder = false
              break
            }
          }
        } else if (!rulesMap[num] && index !== numbers.length - 1) {
          isCorrectOrder = false
          break
        }

        console.log(' .  . isCorrectOrder:', isCorrectOrder)
        if (!isCorrectOrder) {
          break
        }
      }

      if (isCorrectOrder) {
        answerArray.push(numbers)
      }

    }
  }

  console.log('Total score:', answerArray)
  let sum = 0
  for (let i = 0; i < answerArray.length; i++) {
    const middleIndex = Math.floor(answerArray[i].length / 2)
    sum += parseInt(answerArray[i][middleIndex])
  }

  console.log('Sum:', sum)
}

function createRuleMap(line, rulesMap) {
  if (line.includes('|')) {
    const [key, value] = line.split('|')

    if (rulesMap[key]) {
      rulesMap[key].push(value)
    } else {
      rulesMap[key] = [value]
    }
  }
}


start()