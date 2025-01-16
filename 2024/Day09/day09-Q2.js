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
  let fileCount = 0
  let spaceCount = 0
  let currentFile = '9999'
  while (currentFile !== '0') {
    // 1. 判斷檔案大小
    // 2. 判斷剩餘空間大小
    // 3. 判斷剩餘空間大小是否足夠，是的話就填滿檔案，否則往下搜尋
    console.log('Current file:', currentFile, 'PointerBack:', pointerBack)
    // 並找到下一個檔案
    while (pointerBack >= 0 && processedArray[pointerBack] !== currentFile) {
      pointerBack--
    }
    console.log(' . FILE FOUND!!', processedArray[pointerBack])
    // 取得檔案大小
    while (currentFile === processedArray[pointerBack]) {
      fileCount++
      pointerBack--
    }
    console.log(' . File count:', fileCount)
    // 取得剩餘空間大小，並判斷是否足夠
    while (spaceCount < fileCount && pointerFront < pointerBack) {
      if (processedArray[pointerFront] === '.') {
        spaceCount++
      } else {
        spaceCount = 0
      }
      pointerFront++
    }
    console.log(' .  Space count:', spaceCount)
    // 如沒有足夠空間，換下一個檔案
    if (spaceCount < fileCount) {
      // 重置檔案大小與空間大小
      spaceCount = 0
      fileCount = 0
      pointerFront = 0
      const tempCurrentFile = Number(currentFile) - 1
      currentFile = tempCurrentFile.toString()
      continue
    }

    // 有找到足夠空間，填滿檔案
    if (spaceCount >= fileCount && fileCount > 0) {
      console.log('FIND ENOUGH SPACE', pointerFront, spaceCount)
      for (let i = 0; i < fileCount; i++) {
        processedArray[pointerFront - i - 1] = currentFile
        processedArray[pointerBack + i + 1] = '.'
      }
    }

    // 重置檔案大小與空間大小
    spaceCount = 0
    fileCount = 0
    pointerFront = 0
    // 換下一個檔案
    const tempCurrentFile = Number(currentFile) - 1
    currentFile = tempCurrentFile.toString()
  }

  const result = multiplyAndAdd(processedArray)
  for (let i = 0; i < processedArray.length; i++) {
    console.log(i, processedArray[i])
  }
  console.log('Final answer:', processedArray, result)
}
function multiplyAndAdd(array) {
  let sum = 0
  let index = 0
  while (true) {
    if (array[index] !== '.') {
      sum += parseInt(array[index]) * index
    }
    index++
    if (index >= array.length) {
      break
    }
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