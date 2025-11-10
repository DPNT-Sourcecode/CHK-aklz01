var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const CheckoutSolution = require('../../../lib/solutions/CHK/checkout_solution');

describe('CHK Challenge: Checkout', function() {
    it('empty input returns zero', () => {
        assert.strictEqual(new CheckoutSolution().checkout(''), 0)
    })

    it('single A returns 50', () => {
        assert.strictEqual(new CheckoutSolution().checkout('A'), 50)
    })

    it('single B returns 30', () => {
        assert.strictEqual(new CheckoutSolution().checkout('B'), 30)
    })

    it('single C returns 20', () => {
        assert.strictEqual(new CheckoutSolution().checkout('C'), 20)
    })

    it('single D returns 15', () => {
        assert.strictEqual(new CheckoutSolution().checkout('D'), 15)
    })

    it.skip('empty input returns zero', () => {
        assert.strictEqual(true, true)
    })
})
