
const fileReader = require('../utils/fileReader')

async function start(inputPath, input, dataStructure) {
  console.log(`${new Date()}`)
  const rule = input === 'test' ? 'LLR' : 'LRLRRRLRRLRLRRRLRRLLRRRLRLRLRLRRLRRRLRRLLRLRLRRRLRLLRRLRRLRLLRRLLRRLRRRLLRRLRRLRRRLRRRLRRRLRLRRLRRRLLRRLRRLRRRLRLRRRLRRLRRRLRRRLRLRLRLRLRLRLLRRLLLLRLRRRLRRRLLRRLRLRLLRRRLRLRRLRRRLLLLRRRLLRRLRRLRRLLRLLLLRLRRRLRLRRLRRLLRRRLRRLRLRRLRRRLLRRRLLRLRRLRRLLRRRLLRLRRLRLRRLLLRRRR'

  const rl = await fileReader(inputPath)

  const nodeArray = []
  let GO = { 'L': {}, 'R': {} }
  let nodeMap = new Map()
  for await (const line of rl) {
    const nodeName = line.split('=')[0].trim()
    const val = line.split('=')[1].trim()
    const left = val.split(',')[0].trim().replace('(', '')
    const right = val.split(',')[1].trim().replace(')', '')

    if (dataStructure === 'array') {
      nodeArray.push(new Node(nodeName, left, right))
    } else if (dataStructure === 'map') {
      nodeMap.set(nodeName, [left, right])
    }
    else {
      GO['L'][nodeName] = left
      GO['R'][nodeName] = right
    }
  }

  let stepCount = 0
  let ruleCheck = rule

  if (dataStructure === 'array') {
    const startNode = nodeArray.find(x => x.name === 'AAA')
    let curNode = startNode
    while (curNode.name !== 'ZZZ') {
      ruleCheck = stepCount >= rule.length ? ruleCheck.concat(rule) : rule
      let nextNode = nodeArray.find(node => node.name === curNode[ruleCheck[stepCount]])
      curNode = nextNode
      stepCount++
    }
  } else if (dataStructure === 'map') {
    let LR = ruleCheck[stepCount] === 'L' ? 0 : 1
    let curNode = 'AAA'
    while (curNode !== 'ZZZ') {
      ruleCheck = stepCount >= rule.length ? ruleCheck.concat(rule) : rule
      LR = ruleCheck[stepCount] === 'L' ? 0 : 1
      curNode = nodeMap.get(curNode)[LR]
      stepCount++
    }
  } else {
    let curNode = 'AAA'
    while (curNode !== 'ZZZ') {
      ruleCheck = stepCount >= rule.length ? ruleCheck.concat(rule) : rule
      let nextNode = GO[ruleCheck[stepCount]][curNode]
      curNode = nextNode
      stepCount++
    }
  }


  console.log(`${new Date()} ${stepCount}`)

}
class Node {
  constructor(name, L, R) {
    this.name = name;
    this.L = L;
    this.R = R;
  }
}
//使用遞迴會造成StackOverFlowError
function goNavigate(currentNode, instruction, stepCount, dataArray, rule) {
  let allStepCount = stepCount + 1
  let ruleCheck = allStepCount >= rule.length ? rule.concat(rule) : rule
  const nextNode = dataArray.find(node => node.name === currentNode[instruction])
  console.log(`CurrentNode:${currentNode.name}, allStepCount:${allStepCount}`)
  if (nextNode.name !== 'ZZZ') {
    return allStepCount = goNavigate(nextNode, ruleCheck[allStepCount], allStepCount, dataArray, ruleCheck)
  }
  else {
    return allStepCount
  }
}

start('./input.txt', '', '')
