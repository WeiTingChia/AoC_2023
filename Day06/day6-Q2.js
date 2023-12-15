function determineWinningTimes(time, distance) {
  const holdingTime = Number(time)
  const distanceRecord = Number(distance)

  const distanceList = []
  for (let i = 0; i <= holdingTime; i++) {
    distanceList.push(i * (holdingTime - i))
  }
  const winners = distanceList.filter(x => x > distanceRecord)

  console.log(winners.length)
}

determineWinningTimes(60947882, 475213810151650)