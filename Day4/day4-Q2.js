const { match } = require('assert');
const fileReader = require('../utils/fileReader')

async function start(input) {
  let rl = await fileReader(input)

  let sum = 0;
  let lineIndex = 0;
  let winningCard = [1]
  let winningCardMapped = []
  for await (const line of rl) {
    let matchTimes = 0
    const winningNumbers = line.split('|')[0].split(':')[1].trim().split(' ').filter((x) => x !== '').map((x) => Number(x))
    const ticketNumbers = line.split('|')[1].trim().split(' ').filter((x) => x !== '').map((x) => Number(x))

    ticketNumbers.forEach((x) => {
      if (winningNumbers.includes(x)) {
        matchTimes++
      }
    })
    const cardNumbers = winningCard[lineIndex] === undefined ? 1 : winningCard[lineIndex]
    for (let j = 0; j < cardNumbers; j++) {
      for (let i = 0; i < matchTimes; i++) {
        winningCard[lineIndex + 1 + i] = isNaN(winningCard[lineIndex + 1 + i]) ? 2 : winningCard[lineIndex + 1 + i] + 1
      }
    }

    winningCardMapped = [...winningCard].map((x) => x === undefined ? 1 : x)
    console.log(winningCardMapped)

    sum = sum + winningCardMapped[lineIndex]

    console.log(line)
    console.log('MatchTimes: ', matchTimes)
    console.log('WinningCard:', winningCardMapped[lineIndex])
    console.log('Sum so far: ', sum)
    console.log('--------------------')
    lineIndex++
  }

  console.log('Sum: ', sum)
  return sum
}
start('./input.txt')
module.exports = start;