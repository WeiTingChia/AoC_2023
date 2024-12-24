const fileReader = require('../utils/fileReader')

async function start(inputPath) {

  const rl = await fileReader(inputPath)

  const dataArray = []
  for await (const line of rl) {
    dataArray.push([...line.trim().split(' ')])
  }
  let result = 0
  dataArray.forEach(arr => {
    console.log('arr:', arr)
    let nextNumber = calculateNextNumber(arr)
    console.log('nextNumber:', nextNumber)
    result += nextNumber
    console.log('result:', result)
  })
  console.log(result)
}

function calculateNextNumber(arr) {
  let length = arr.length
  let newArr = []
  for (let i = 1; i < length; i++) {
    let el = Number(arr[length - i]) - Number(arr[length - 1 - i])
    newArr[length - i - 1] = el
  }
  let ifAllSame = newArr.every(el => el === 0)
  if (!ifAllSame) {
    // console.log(newArr)
    return calculateNextNumber(newArr) + Number(arr[arr.length - 1])
  } else {
    return Number(newArr[newArr.length - 1]) + Number(arr[arr.length - 1])
  }

}

start('./input.txt')