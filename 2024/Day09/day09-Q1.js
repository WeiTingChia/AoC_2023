const fileReader = require('../../utils/fileReader')

async function start() {
  const fl = await fileReader('./input.txt')
  let input = []

  for await (const line of fl) {
    input = line
  }

  const formattedInput = formateInput(input)

  let pointerFront = 0
  let pointerBack = formattedInput.length - 1
  let processedArray = [...formattedInput]
  while (pointerFront < pointerBack) {
    if (processedArray[pointerFront] === '.') {
      if (processedArray[pointerBack] === '.') {
        pointerBack--
        continue
      }
      console.log('Pointer:', pointerFront, pointerBack)
      processedArray[pointerFront] = processedArray[pointerBack]
      processedArray[pointerBack] = '.'
      pointerFront++
      pointerBack--
    } else if (processedArray[pointerBack] === '.') {
      pointerBack--
    } else {
      pointerFront++
    }
  }

  const result = multiplyAndAdd(processedArray)
  console.log('Final answer:', formattedInput, processedArray, result)
}
function multiplyAndAdd(array) {
  let sum = 0
  let index = 0
  while (array[index] !== '.') {
    sum += parseInt(array[index]) * index
    index++
  }
  return sum
}

function formateInput(input) {
  const formattedInput = []
  let index = 0
  for (let pointer = 0; pointer < input.length; pointer++) {
    const isDot = pointer % 2 === 1
    if (isDot) {
      for (let i = 0; i < parseInt(input[pointer]); i++) {
        formattedInput.push('.')
      }
    } else {
      for (let i = 0; i < parseInt(input[pointer]); i++) {
        formattedInput.push(index.toString())
      }
      index++
    }
  }
  return formattedInput
}

start()