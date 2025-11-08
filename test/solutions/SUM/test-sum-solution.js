var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const SumSolution = require('../../../lib/solutions/SUM/sum_solution');

describe('SUM challenge: adding two numbers', function() {
	it('should return 3, which is the sum of 1 and 2', function() {
	    assert.equal(new SumSolution().compute(1, 2), 3);
	});
	it('raise integer out of range error for negative numbers', function() {
		assert.throws(() => {new SumSolution().compute(-1, 2)}, /Integer out of range/);
	})
	it('rasies integer out of range error for numbers greater than 100', function() {
		assert.throws(() => {new SumSolution().compute(101, 2)}, /Integer out of range/);
	})
});