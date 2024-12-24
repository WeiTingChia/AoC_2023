
function day6_part1() {
  const allWinnersCount = []
  allWinnersCount.push(determineWinningTimes(60, 475))
  allWinnersCount.push(determineWinningTimes(94, 2138))
  allWinnersCount.push(determineWinningTimes(78, 1015))
  allWinnersCount.push(determineWinningTimes(82, 1650))

  const result = allWinnersCount.reduce((a, b) => a * b, 1)
  console.log(result)
}

function day6_part2() {
  console.log(`Q2: ${determineWinningTimes(60947882, 475213810151650)}`)
}

function determineWinningTimes(time, distance) {
  const holdingTime = Number(time)
  const distanceRecord = Number(distance)

  const distanceList = []
  for (let i = 0; i <= holdingTime; i++) {
    distanceList.push(i * (holdingTime - i))
  }
  const winners = distanceList.filter(x => x > distanceRecord)

  return winners.length
}

day6_part1()