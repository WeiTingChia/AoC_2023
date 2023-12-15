var should = require('should');
var average = require('../Day-Test/average')

describe('calculator average', () => {
  it('should return the average of t he array', done => {
    let result = average([1, 2, 3])
    result.should.equal(2)
    done()
  })

  it('should return NaN when no element in array', done => {
    let result = average([])
    result.should.be.NaN
    done()

  })
})