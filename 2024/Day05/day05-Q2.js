
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
      // 每行的數字check
      for (let index = 0; index < numbers.length; index++) {
        const num = numbers[index]

        //Map中有這個key
        if (rulesMap[num]) {
          const restArray = numbers.slice(index, numbers.length)
          for (let i = 1; i < restArray.length; i++) {
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
        if (!isCorrectOrder) {
          break
        }
      }

      if (!isCorrectOrder) {
        answerArray.push(numbers)
      }

    }
  }

  console.log('AnswerArray:', answerArray)
  let sum = 0
  const answerArray2 = []
  for (let i = 0; i < answerArray.length; i++) {
    console.log('answerArray[i]:', answerArray[i])
    // 按照規則重新排序
    checkAllNumb(answerArray[i], rulesMap, answerArray2)
  }

  console.log('New answerArray:', answerArray2)

  for (let i = 0; i < answerArray2.length; i++) {
    const middleIndex = Math.floor(answerArray2[i].length / 2)
    sum += parseInt(answerArray2[i][middleIndex])
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
// array: [ '75', '97', '47', '61', '53' ]
function checkAllNumb(array, rulesMap, answerArray2) {
  // 建立一個新的陣列
  const newArray = []
  // 每行的數字check 75,97,47,61,53
  for (let index = 0; index < array.length; index++) {
    const num = array[index]
    console.log(' . num:', num)
    if (index === 0) {
      newArray.push(num)
      continue
    }
    for (let j = 0; j < newArray.length; j++) {
      console.log(' . . newArray[j]:', newArray[j], 'j:', j)
      if (rulesMap[newArray[j]] && rulesMap[newArray[j]].includes(num)) {
        if (j === newArray.length - 1) {
          console.log('PUSH')
          newArray.push(num)
          break
        }
        continue
      } else {
        console.log(' . SPLICE')
        newArray.splice(j, 0, num)
        break
      }
    }

  }
  answerArray2.push(newArray)
}


start()