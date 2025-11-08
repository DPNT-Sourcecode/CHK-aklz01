var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const HelloSolution = require('../../../lib/solutions/HLO/hello_solution');

describe('HLO Challenge: Saying hello', function() {
    it('should return the string "Hello" with the string passed', function() {
        assert.strictEqual(new HelloSolution().hello('Russell'), 'Hello, Russelll!')
    })
})