const should = require('should')
const start = require('../Day4/day4-Q2')

describe('#day4-Q2', () => {
  // 測試算出來的平均是不是 2.5
  it('should return the scratchCard numbers', async done => {
    new Promise((resolve, reject) => {
      resolve(start('../Day4/test-input.txt'))
    }).then((result) => {
      result.should.equal(30)
    }).then(done())
  })

})