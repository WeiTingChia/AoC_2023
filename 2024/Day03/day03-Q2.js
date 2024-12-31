const fileReader = require('../../utils/fileReader')

// 逐字檢查是否開頭為mul(接數字
// 把數字依序push到陣列numb1中，直到遇到","為止，並將array串起來並轉為數字
// 再來numb2同上，直到遇到")"
// 最後將numb1 * numb2 並加總
// 只要中間有不符合條件的就跳過
// 最後輸出結果
async function start() {
  const fl = await fileReader('./input.txt')
  let sum = 0
  let count = 0
  let actualCount = 0
  for await (const line of fl) {
    let numb1 = []
    let numb2 = []
    let i = 0
    let doFlag = true
    while (i < line.length) {
      if (line[i] === 'd' && line[i + 1] === 'o' && line[i + 2] === '(' && line[i + 3] === ')') {
        doFlag = true
      }
      if (line[i] === 'd' && line[i + 1] === 'o' && line[i + 2] === 'n' && line[i + 3] === '\'' && line[i + 4] === 't' && line[i + 5] === '(' && line[i + 6] === ')') {
        doFlag = false
      }
      if (line[i] === 'm' && line[i + 1] === 'u' && line[i + 2] === 'l' && line[i + 3] === '(') {
        i += 4
        while (line[i] !== ',' && !isNaN(Number(line[i])) && line[i] !== ' ') {
          numb1.push(line[i])
          i++
        }
        count++
        console.log('count:', count)
        if (line[i] === ',') {
          i++
        }

        while (line[i] !== ')' && !isNaN(Number(line[i])) && line[i] !== ' ') {
          numb2.push(line[i])
          i++
        }
        if (numb1.length === 0 || numb2.length === 0 || line[i] !== ')') {
          numb1 = []
          numb2 = []
          continue
        }
        actualCount++
        console.log('actualCount:', actualCount)
        if (doFlag) {
          sum += parseInt(numb1.join('')) * parseInt(numb2.join(''))
        }
        console.log('numb1:', numb1.join(''), 'numb2:', numb2.join(''), sum)
        numb1 = []
        numb2 = []
      } else {
        numb1 = []
        numb2 = []
        i++
      }
    }
  }
  console.log('Total score:', sum)
}


start()