const fileReader = require('../utils/fileReader')

async function start() {
  const rl = await fileReader('./input.txt')

  let sum = 0;
  for await (const line of rl) {
    let matchTimes = 0
    const winningNumbers = line.split('|')[0].split(':')[1].trim().split(' ').filter((x) => x !== '').map((x) => Number(x))
    const ticketNumbers = line.split('|')[1].trim().split(' ').filter((x) => x !== '').map((x) => Number(x))

    ticketNumbers.forEach((x) => {
      if (winningNumbers.includes(x)) {
        matchTimes++
      }
    })

    let winningPoints = 1;
    for (let i = 1; i < matchTimes; i++) {
      winningPoints *= 2
    }

    if (matchTimes === 0) {
      winningPoints = 0
    }

    sum += winningPoints
  }

  console.log('WinningPoints: ', sum)
}
start()