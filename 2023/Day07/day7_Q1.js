const fileReader = require('../utils/fileReader')

async function start(inputPath) {
  const rl = await fileReader(inputPath)

  const strengthRank = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
  // 'AAAAA' -> 'AAAA9' -> 'AAAJJ' -> 'AAA78' -> 'AAKK8' -> 'AA975' -> '46789'
  const allHandsArray = []
  for await (const line of rl) {
    const handCard = line.trim().split(' ')[0]
    const bidAmount = line.trim().split(' ')[1]
    allHandsArray.push({ cards: handCard, val: Number(bidAmount) })



    // console.log('Mapping', mappingCard)
    // console.log(Object.values(mappingCard))
    allHandsArray.sort(sortingRank)
    // console.log(allHandsArray)
  }
  let ans = 0;
  allHandsArray.forEach((x, index) => {
    ans += (index + 1) * x.val
  })
  console.log(ans)

}
function compareStrength(aCard, bCard) {
  const strengthRank = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
  i = 0
  while (i < 5) {
    if (strengthRank.indexOf(aCard[i].toString()) < strengthRank.indexOf(bCard[i].toString())) {
      return 1
    }
    else if (strengthRank.indexOf(aCard[i].toString()) > strengthRank.indexOf(bCard[i].toString())) {
      return -1
    }
    else {
      i++
    }

  }
}

function sortingRank(a, b) {
  const mappingCardA = {};
  Array.from(a.cards).forEach(card => {
    if (mappingCardA[card]) {
      mappingCardA[card] = mappingCardA[card] + 1
    }
    else {
      mappingCardA[card] = 1
    }
  })
  const mappingCardB = {};
  Array.from(b.cards).forEach(card => {
    if (mappingCardB[card]) {
      mappingCardB[card] = mappingCardB[card] + 1

    } else {
      mappingCardB[card] = 1
    }
  })
  const A = Object.values(mappingCardA)
  const B = Object.values(mappingCardB)
  const strengthRank = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
  // Five of a kind
  if (A.includes(5) && B.includes(5)) {
    if (strengthRank.indexOf(a.cards[0].toString()) < strengthRank.indexOf(b.cards[0].toString())) {
      return 1
    } else {
      return -1
    }
  }
  if (A.includes(5)) {
    return 1
  }
  if (B.includes(5)) {
    return -1
  }
  // Four of a kind
  if (A.includes(4) && B.includes(4)) {
    return compareStrength(a.cards, b.cards)
  }
  if (A.includes(4)) {
    return 1
  }
  if (B.includes(4)) {
    return -1
  }
  // Full house
  if (A.includes(3) && A.includes(2) && B.includes(3) && B.includes(2)) {
    // if (strengthRank.indexOf(findKeyByValue(mappingCardA, 3)) < strengthRank.indexOf(findKeyByValue(mappingCardB, 3))) {
    //   return 1
    // }
    // else if (strengthRank.indexOf(findKeyByValue(mappingCardA, 3)) == strengthRank.indexOf(findKeyByValue(mappingCardB, 3)) && strengthRank.indexOf(findKeyByValue(mappingCardA, 2)) < strengthRank.indexOf(findKeyByValue(mappingCardB, 2))) {
    //   return 1
    // }
    // else {
    //   return -1
    // }
    return compareStrength(a.cards, b.cards)
  }
  if (A.includes(3) && A.includes(2)) {
    return 1
  }
  if (B.includes(3) && B.includes(2)) {
    return -1
  }
  // Three of a kind
  if (A.includes(3) && B.includes(3)) {
    // if (strengthRank.indexOf(findKeyByValue(mappingCardA, 3)) < strengthRank.indexOf(findKeyByValue(mappingCardB, 3))) {
    //   return 1
    // }
    // return -1
    return compareStrength(a.cards, b.cards)
  }
  if (A.includes(3)) {
    return 1
  }
  if (B.includes(3)) {
    return -1
  }
  // Two pair
  if (A.filter(x => x !== 2).length === 1 && B.filter(x => x !== 2).length === 1) {
    return compareStrength(a.cards, b.cards)
  }
  if (A.includes(2) && A.filter(x => x !== 2).length === 3 && B.includes(2) && B.filter(x => x !== 2).length === 3) {
    return compareStrength(a.cards, b.cards)
  }
  if (A.includes(2) && A.filter(x => x === 2).length == 2) {
    return 1
  }
  if (B.includes(2) && B.filter(x => x === 2).length == 2) {
    return -1
  }
  // One pair
  if (A.includes(2) && B.includes(2)) {
    return compareStrength(a.cards, b.cards)
  }
  if (A.includes(2)) {
    return 1
  }
  if (B.includes(2)) {
    return -1
  }
  return compareStrength(a.cards, b.cards)


}
function findKeyByValue(obj, targetValue) {
  const foundKey = Object.keys(obj).find(key => obj[key] === targetValue);
  return foundKey || null;
}

start('./input.txt')