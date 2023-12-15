const fileReader = require('../utils/fileReader')

async function start() {
  const fl = await fileReader('./input.txt')
  let index = 1;
  let sum = 0;
  for await (const line of fl) {
    //先分出每次遊戲的抓取次數, 以分號';'分隔
    //再看每次抓取的顏色及數量, 以逗號','分隔
    //再判斷數量是否合理
    // 12 red, 13 green, 14 blue
    // console.log(`Game ${index}:`)
    const colorLimit = {
      red: 12,
      green: 13,
      blue: 14
    }



    let result = true

    let eachGrab = line.split(':')[1].split(';')

    eachGrab.forEach((item) => {

      let colorCubes = {
        red: 0,
        green: 0,
        blue: 0
      }

      let colors = item.split(',')
      colors.forEach((color) => {
        colorCubes[color.trim().split(' ')[1]] = parseInt(color.trim().split(' ')[0])
      })

      // console.log(`${item}`)
      // console.log(`colorCubes: ${JSON.stringify(colorCubes)}`)

      if (colorCubes.red > colorLimit.red || colorCubes.green > colorLimit.green || colorCubes.blue > colorLimit.blue) {
        result = false
      }
    })
    if (result) {
      sum += index
    }
    // console.log(`result: ${result}, score: ${sum}`)
    // console.log('----------------------------------------')

    index++
  }
  console.log(`Total score: ${sum}`)
}

start()