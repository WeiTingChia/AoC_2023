const fileReader = require('../utils/fileReader')

function isdigit(char) {
  return !isNaN(char)
}
async function processLineByLine() {
  let sum = 0;
  const numberArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

  const rl = await fileReader('./input2.txt')

  for await (const line of rl) {
    const isDigits = []
    const arr = Array.from(line);
    arr.forEach((char, index) => {
      if (isdigit(char)) {
        isDigits.push(char)
      }
      numberArray.forEach((number, numbIndex) => {
        if (line.startsWith(number, index)) {
          isDigits.push((numbIndex + 1).toString())
        }
      })
    })
    // console.log('Line: ', line)
    // console.log('isDigits: ', isDigits)
    sum += Number(isDigits[0]) * 10 + Number(isDigits[isDigits.length - 1])
  }

  console.log('Sum: ', sum)
}

processLineByLine();