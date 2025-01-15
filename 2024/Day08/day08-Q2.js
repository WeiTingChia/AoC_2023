const fileReader = require('../../utils/fileReader')

async function start() {
  const fl = await fileReader('./input.txt')
  const matrix = []
  let width = 0
  let height = 0

  for await (const line of fl) {
    matrix.push(line)
  }
  width = matrix[0].length
  height = matrix.length

  // 找出所有相同符號的座標
  // 並算出每個符號相鄰的距離
  const sameSymbol = {}
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const symbol = matrix[y][x]
      if (symbol === '.') {
        continue
      }
      if (!sameSymbol[symbol]) {
        sameSymbol[symbol] = []
      }
      sameSymbol[symbol].push([x, y])
    }
  }
  let sum = 0
  const coordinates = new Set()
  // 計算每個符號相鄰的距離
  for (const symbol in sameSymbol) {
    for (let i = 0; i < sameSymbol[symbol].length; i++) {
      const [x1, y1] = sameSymbol[symbol][i]
      coordinates.add(x1.toString() + ',' + y1.toString())
      for (let j = i + 1; j < sameSymbol[symbol].length; j++) {
        const [x2, y2] = sameSymbol[symbol][j]
        let [newX1, newY1, newX2, newY2] = [x1, y1, x2, y2]
        coordinates.add(x2.toString() + ',' + y2.toString())
        const distance = [x1 - x2, y1 - y2]
        console.log(symbol, x1, y1, x2, y2, distance)
        while ((newX1 + distance[0] >= 0 && newX1 + distance[0] < width && newY1 + distance[1] >= 0 && newY1 + distance[1] < height)
        ) {
          console.log('Sum1:', [newX1 + distance[0], newY1 + distance[1]])
          coordinates.add((newX1 + distance[0]).toString() + ',' + (newY1 + distance[1]).toString())
          newX1 = newX1 + distance[0]
          newY1 = newY1 + distance[1]
        }
        while ((newX2 - distance[0] >= 0 && newX2 - distance[0] < width && newY2 - distance[1] >= 0 && newY2 - distance[1] < height)) {
          console.log('Sum2:', [newX2 - distance[0], newY2 - distance[1]])
          coordinates.add((newX2 - distance[0]).toString() + ',' + (newY2 - distance[1]).toString())
          newX2 = newX2 - distance[0]
          newY2 = newY2 - distance[1]
        }
      }
    }
  }


  console.log('Final answer:', sameSymbol, coordinates.size)
}

start()