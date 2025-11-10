var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const CheckoutSolution = require('../../../lib/solutions/CHK/checkout_solution');
const { PRICES, MULTI_BUY_OFFERS } = require('../../../lib/solutions/CHK/inventory/prices')

describe('CHK Challenge: Checkout', function () {
    it('should return zero for empty input', () => {
        assert.strictEqual(new CheckoutSolution().checkout(''), 0)
    })

    it('should return the correct price for a single A', () => {
        assert.strictEqual(new CheckoutSolution().checkout('A'), PRICES['A'])
    })

    it('should return the correct price for a single B', () => {
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
        assert.strictEqual(new CheckoutSolution().checkout('ABCD'), PRICES['A'] + PRICES['B'] + PRICES['C'] + PRICES['D'])
    })

    it('should return the offer price for three A skus', () => {
        OFFER_PRICE_FOR_A = MULTI_BUY_OFFERS['A'][0].price
        assert.strictEqual(new CheckoutSolution().checkout('AAA'), OFFER_PRICE_FOR_A)
    })

    it('should return the offer price for two B skus', () => {
        OFFER_PRICE_FOR_B = MULTI_BUY_OFFERS['B'][0].price
        assert.strictEqual(new CheckoutSolution().checkout('BB'), OFFER_PRICE_FOR_B)
    })

    it('should return the correct price for complex basket: AAABBA', () => {
        OFFER_PRICE_FOR_A = MULTI_BUY_OFFERS['A'][0].price
        OFFER_PRICE_FOR_B = MULTI_BUY_OFFERS['B'][0].price
        EXPECTED_TOTAL = OFFER_PRICE_FOR_A + OFFER_PRICE_FOR_B + PRICES['A']
        assert.strictEqual(new CheckoutSolution().checkout('AAABBA'), EXPECTED_TOTAL)
    })

    it('should return -1 for an input that contains invalid skus', () => {
        assert.strictEqual(new CheckoutSolution().checkout('ABG'), -1)
    })

    it('should return -1 for an input that contains invalid string', () => {
        assert.strictEqual(new CheckoutSolution().checkout('AB C'), -1)
    })
})