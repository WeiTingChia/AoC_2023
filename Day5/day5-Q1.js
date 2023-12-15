
const fileReader = require('../utils/fileReader')

async function start(test) {
  const product_input = [41218238, 421491713, 1255413673, 350530906, 944138913, 251104806, 481818804, 233571979, 2906248740, 266447632, 3454130719, 50644329, 1920342932, 127779721, 2109326496, 538709762, 3579244700, 267233350, 4173137165, 60179884]
  const test_input = [79, 14, 55, 13]
  const input = test ? test_input : product_input
  let result = Number.MAX_SAFE_INTEGER
  const path_domain = test ? 'input_test' : 'input'

  input.forEach(async (x) => {
    const output = await correspondMap(`./${path_domain}/humidity-to-location.txt`, await correspondMap(
      `./${path_domain}/temperature-to-humidity.txt`,
      await correspondMap(
        `./${path_domain}/light-to-temperature.txt`,
        await correspondMap(
          `./${path_domain}/water-to-light.txt`,
          await correspondMap(
            `./${path_domain}/fertilized-to-water.txt`,
            await correspondMap(
              `./${path_domain}/soil-to-fertilized.txt`,
              await correspondMap(`./${path_domain}/seed-to-soil.txt`, x)))))))

    result = output < result ? output : result
    console.log('output', result)

  })



  console.log('final result: ', result)
}

async function correspondMap(filePath, input) {
  const inputNumber = input
  const rl = await fileReader(filePath)
  let result = 0
  for await (const line of rl) {
    const numberArr = line.trim().split(' ')
    if (numberArr.length !== 3) continue
    if (result !== 0 && result !== inputNumber) continue

    const number = Number(numberArr[0])
    const correspondNumber = Number(numberArr[1])
    const correspondLength = Number(numberArr[2])

    if (correspondNumber <= inputNumber && inputNumber <= correspondNumber + correspondLength - 1) {
      result = inputNumber - correspondNumber + number
    } else {
      result = inputNumber
    }
  }

  return result
}
module.exports = correspondMap

// correspondMap('./input_test/soil-to-fertilized.txt', correspondMap('./input_test/seed-to-soil.txt', 79))
// correspondMap('./input_test/seed-to-soil.txt', 79)
start(false)