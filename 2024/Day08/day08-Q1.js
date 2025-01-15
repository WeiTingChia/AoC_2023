const fileReader = require('../../utils/fileReader')

async function start() {
  const fl = await fileReader('./test_input.txt')
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
  // 計算每個符號相鄰的距離
  for (const symbol in sameSymbol) {
    for (let i = 0; i < sameSymbol[symbol].length; i++) {
      const [x1, y1] = sameSymbol[symbol][i]
      for (let j = i + 1; j < sameSymbol[symbol].length; j++) {
        const [x2, y2] = sameSymbol[symbol][j]
        const distance = [x1 - x2, y1 - y2]
        console.log(symbol, x1, y1, x2, y2, distance)
        if ((x1 - distance[0] >= 0 && x1 - distance[0] < width && y1 - distance[1] >= 0 && y1 - distance[1] < height)
        ) {
          sum++
        }
        if ((x2 + distance[0] >= 0 && x2 + distance[0] < width && y2 + distance[1] >= 0 && y2 + distance[1] < height)) {
          sum++
        }
      }
    }
  }


  console.log('Final answer:', sameSymbol, sum)
}

start()