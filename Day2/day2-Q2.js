const fileReader = require('../utils/fileReader')

async function start() {
  const fl = await fileReader('./input.txt')
  let totalSum = 0;
  let gameSum = 1;
  for await (const line of fl) {

    let colorCubes = {
      red: 0,
      green: 0,
      blue: 0
    }

    let eachGrab = line.split(':')[1].split(';')

    eachGrab.forEach((item) => {
      gameSum = 1
      let colors = item.split(',')

      colors.forEach((color) => {

        const colorNumbers = color.trim().split(' ')[0]
        const colorName = color.trim().split(' ')[1]

        if (parseInt(colorNumbers) > colorCubes[colorName]) {
          colorCubes[colorName] = parseInt(colorNumbers)
        }
      })

      Object.values(colorCubes).forEach((colorCube) => {
        gameSum *= colorCube
      })

    })

    totalSum += gameSum
  }
  console.log(`Total score: ${totalSum}`)
}

start()