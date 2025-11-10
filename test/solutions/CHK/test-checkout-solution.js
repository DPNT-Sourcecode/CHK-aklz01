var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const CheckoutSolution = require('../../../lib/solutions/CHK/checkout_solution');
const {PRICES} = require('../../../lib/solutions/CHK/inventory/prices')

describe('CHK Challenge: Checkout', function() {
    it('should return zero for empty input', () => {
        assert.strictEqual(new CheckoutSolution().checkout(''), 0)
    })

    it('should return the correct price for a single A', () => {
        assert.strictEqual(new CheckoutSolution().checkout('A'), PRICES['A'])
    })

    it('should return the correct price  for a single B', () => {
        assert.strictEqual(new CheckoutSolution().checkout('B'), PRICES['B'])
    })

    it('should return the correct price  for a single C', () => {
        assert.strictEqual(new CheckoutSolution().checkout('C'), PRICES['C'])
    })

    it('should return the correct price  for a single D', () => {
        assert.strictEqual(new CheckoutSolution().checkout('D'), PRICES['D'])
    })

    it('should return -1 for an input that is not a valid string', () => {
        assert.strictEqual(new CheckoutSolution().checkout(2), -1)
    })

    it('should return the total for multiple items: ABCD', () => {
        assert.strictEqual(new CheckoutSolution().checkout('ABCD'), 115)
    })

    it('should return the offer price for three A skus', () => {
        assert.strictEqual(new CheckoutSolution().checkout('AAA'), 130)
    })

    // it('', () => {})
})