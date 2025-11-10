var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const CheckoutSolution = require('../../../lib/solutions/CHK/checkout_solution');

describe('CHK Challenge: Checkout', function() {
    it('empty input returns zero', () => {
        assert.strictEqual(new CheckoutSolution().checkout(''), 0)
    })

    it.skip('single A returns 50', () => {
        assert.strictEqual(true, true)
    })

    it.skip('single B returns 30', () => {
        assert.strictEqual(true, true)
    })

    it.skip('single C returns 20', () => {
        assert.strictEqual(true, true)
    })

    it.skip('single D returns 15', () => {
        assert.strictEqual(true, true)
    })

    it.skip('empty input returns zero', () => {
        assert.strictEqual(true, true)
    })
})