var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const CheckoutSolution = require('../../../lib/solutions/CHK/checkout_solution');
const PRICES = require('../../../lib/solutions/CHK/inventory/prices')

describe('CHK Challenge: Checkout', function() {
    it('empty input returns zero', () => {
        assert.strictEqual(new CheckoutSolution().checkout(''), 0)
    })

    it('single A returns 50', () => {
        assert.strictEqual(new CheckoutSolution().checkout('A'), PRICES['A'])
    })

    it('single B returns 30', () => {
        assert.strictEqual(new CheckoutSolution().checkout('B'), PRICES['B'])
    })

    it('single C returns 20', () => {
        assert.strictEqual(new CheckoutSolution().checkout('C'), PRICES['C'])
    })

    it('single D returns 15', () => {
        assert.strictEqual(new CheckoutSolution().checkout('D'), PRICES['D'])
    })

    it('no string input returns -1', () => {
        assert.strictEqual(new CheckoutSolution().checkout(2), -1)
    })
})

