var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const HelloSolution = require('../../../lib/solutions/HLO/hello_solution');

describe('HLO Challenge: Saying hello', function() {
    it('should return the string "Hello" with the string passed', function() {
        assert.strictEqual(new HelloSolution().hello('Russell'), 'Hello, Russell!')
    })

    it('should thorw and error for null or undefined input', function() {
        assert.throws(() => new HelloSolution().hello(null), Error);
        assert.throws(() => new HelloSolution().hello(undefined), Error);
    });

    it('should throw an error for non primative input', function() {
        assert.throws(() => new HelloSolution().hello(123), Error)
        assert.throws(() => new HelloSolution().hello([]), Error)
        assert.throws(() => new HelloSolution().hello({}), Error)
    })
})
