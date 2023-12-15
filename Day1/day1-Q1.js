const fs = require('node:fs')
const readline = require('readline');;

async function processLineByLine() {
  let sum = 0;
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const arr = Array.from(line);
    const firstNumberIndex = arr.findIndex((x) => !isNaN(Number(x)));
    const lastNumberIndex = arr.findLastIndex((x) => !isNaN(Number(x)));
    sum += Number(arr[firstNumberIndex]) * 10;
    sum += Number(arr[lastNumberIndex]);
  }

  console.log('Sum: ', sum)
}

processLineByLine();