
const fileReader = require('../utils/fileReader')

async function start(inputPath, input) {
  const rule = input === 'test' ? 'LR' : 'LRLRRRLRRLRLRRRLRRLLRRRLRLRLRLRRLRRRLRRLLRLRLRRRLRLLRRLRRLRLLRRLLRRLRRRLLRRLRRLRRRLRRRLRRRLRLRRLRRRLLRRLRRLRRRLRLRRRLRRLRRRLRRRLRLRLRLRLRLRLLRRLLLLRLRRRLRRRLLRRLRLRLLRRRLRLRRLRRRLLLLRRRLLRRLRRLRRLLRLLLLRLRRRLRLRRLRRLLRRRLRRLRLRRLRRRLLRRRLLRLRRLRRLLRRRLLRLRRLRLRRLLLRRRR'

  const rl = await fileReader(inputPath)

  const nodeArray = []
  const nodeMap = new Map()
  for await (const line of rl) {
    const nodeName = line.split('=')[0].trim()
    const val = line.split('=')[1].trim()
    const left = val.split(',')[0].trim().replace('(', '')
    const right = val.split(',')[1].trim().replace(')', '')
    nodeArray.push(new Node(nodeName, left, right))
    nodeMap.set(nodeName, [left, right])
  }

  const startNode = nodeArray.filter(x => x.name.endsWith('A'))
  startNode.forEach(node => {
    console.log(node)
  })
  let ruleCheck = rule

  let allStepArray = []
  startNode.forEach(node => {
    let stepCount = 0
    let curNode = node.name
    // let curNode = node
    console.log(`${new Date()} Node: ${node.name}`)
    while (!curNode.endsWith('Z')) {
      // while (!curNode.name.endsWith('Z')) {
      ruleCheck = stepCount >= rule.length ? ruleCheck.concat(rule) : rule
      // let nextNode = nodeArray.find(n => n.name === curNode[ruleCheck[stepCount]])
      let LR = ruleCheck[stepCount] === 'L' ? 0 : 1
      let nextNode2 = nodeMap.get(curNode)[LR]
      curNode = nextNode2
      // curNode = nextNode
      stepCount++
    }
    allStepArray.push(stepCount)
  })

  console.log(allStepArray)

  // 计算两个数的最大公约数
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  // 计算数组中所有数字的最小公倍数
  function lcmOfArray(arr) {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
      result = (result * arr[i]) / gcd(result, arr[i]);
    }
    return result;
  }
  const result = lcmOfArray(allStepArray)
  console.log(new Date(), result)

}
class Node {
  constructor(name, L, R) {
    this.name = name;
    this.L = L;
    this.R = R;
  }
}

start('./input.txt', '')