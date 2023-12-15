const fs = require('node:fs')
const readline = require('readline');

async function fileReader(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });


  return rl
}
module.exports = fileReader;