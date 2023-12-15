const fs = require('node:fs')
const readline = require('readline');;

async function processLineByLine() {
  let sum = 0;
  const numberStringMap = new Map([
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9]
  ])
  const regEx = /one|two|three|four|five|six|seven|eight|nine/g

  const fileStream = fs.createReadStream('input2.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const arr = Array.from(line);
    const matchStringArray = line.match(regEx)

    let firstNumberIndex = arr.findIndex((x) => !isNaN(Number(x)));
    let lastNumberIndex = arr.findLastIndex((x) => !isNaN(Number(x)));

    let firstNumberStringIndex = -1;
    let lastNumberStringIndex = -1;

    if (matchStringArray !== null) {
      firstNumberStringIndex = line.indexOf(matchStringArray[0]);
      lastNumberStringIndex = line.lastIndexOf(matchStringArray[matchStringArray.length - 1]);
    }

    console.log('Line: ', line)
    console.log('First Number Index: ', firstNumberIndex, 'First Number String Index: ', firstNumberStringIndex)
    console.log('Last Number Index: ', lastNumberIndex, 'Last Number String Index: ', lastNumberStringIndex)

    let firstNumber = 0;
    let lastNumber = 0;
    if (firstNumberIndex !== -1) {
      firstNumber = Number(arr[firstNumberIndex]) * 10;
    }
    if (lastNumberIndex !== -1) {
      lastNumber = Number(arr[lastNumberIndex]);
    }

    if (firstNumberStringIndex !== -1 && firstNumberStringIndex < firstNumberIndex) {
      firstNumber = numberStringMap.get(matchStringArray[0]) * 10;
    }
    if (lastNumberStringIndex !== -1 && lastNumberStringIndex > lastNumberIndex) {
      lastNumber = numberStringMap.get(matchStringArray[matchStringArray.length - 1]);
    }

    sum += firstNumber;
    sum += lastNumber;
    console.log(`Match string array: [${matchStringArray}]`)
    console.log('Sum so far: ', sum)
    console.log('--------')
  }

  console.log('Sum: ', sum)
}

processLineByLine();