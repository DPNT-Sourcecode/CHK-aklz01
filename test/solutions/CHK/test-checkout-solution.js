var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const CheckoutSolution = require('../../../lib/solutions/CHK/checkout_solution');
const { PRICES, MULTI_BUY_OFFERS } = require('../../../lib/solutions/CHK/chk_config')

describe('CHK Challenge: checkout(string) -> integer', function () {

    describe('Basic Functionality', () => {
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

        it('should return the total for multiple items: ABCD', () => {
            assert.strictEqual(new CheckoutSolution().checkout('ABCD'), PRICES['A'] + PRICES['B'] + PRICES['C'] + PRICES['D'])
        })
    })

    describe('Offers Functionality', () => {

        it('should return the offer price for three A skus', () => {
            OFFER_PRICE_FOR_THREE_A = MULTI_BUY_OFFERS['A'].find(o => o.quantity === 3).price
            assert.strictEqual(new CheckoutSolution().checkout('AAA'), OFFER_PRICE_FOR_THREE_A)
        })

        it('should return the offer price for two B skus', () => {
            OFFER_PRICE_FOR_B = MULTI_BUY_OFFERS['B'][0].price
            assert.strictEqual(new CheckoutSolution().checkout('BB'), OFFER_PRICE_FOR_B)
        })

        it('should return the correct price for complex basket: AAABBA', () => {
            OFFER_PRICE_FOR_THREE_A = MULTI_BUY_OFFERS['A'].find(o => o.quantity === 3).price
            OFFER_PRICE_FOR_B = MULTI_BUY_OFFERS['B'][0].price
            EXPECTED_TOTAL = OFFER_PRICE_FOR_THREE_A + OFFER_PRICE_FOR_B + PRICES['A']
            assert.strictEqual(new CheckoutSolution().checkout('AAABBA'), EXPECTED_TOTAL)
        })
    })

    describe('Edge and Error cases', () => {

        it('should return -1 for an input that is not a valid string', () => {
            assert.strictEqual(new CheckoutSolution().checkout(2), -1)
        })

        it('should return -1 for an input that contains invalid skus', () => {
            assert.strictEqual(new CheckoutSolution().checkout('ABG'), -1)
        })

        it('should return -1 for an input that contains invalid string', () => {
            assert.strictEqual(new CheckoutSolution().checkout('AB C'), -1)
        })
    })

    describe('round 2 - New Item and Offers', () => {
        it('should return the correct price for a single E', () => {
            assert.strictEqual(new CheckoutSolution().checkout('E'), PRICES['E'])
        })

        it('should return the correct price for two E items', () => {
            assert.strictEqual(new CheckoutSolution().checkout('EE'), PRICES['E'] * 2)
        })

        it('should return the correct price for two E and one B (B should be free)', () => {
            assert.strictEqual(new CheckoutSolution().checkout('EEB'), PRICES['E'] * 2)
        })

        it('should return the correct price for two E and two B (B should be free)', () => {
            assert.strictEqual(new CheckoutSolution().checkout('EEBB'), (PRICES['E'] * 2) + PRICES['B'])
        })

        it('should return the correct price for four E and one B (B should be free)', () => {
            assert.strictEqual(new CheckoutSolution().checkout('EEEEB'), PRICES['E'] * 4)
        })

        it('should return the correct offer price for five A, selecting the right offer', () => {
            OFFER_PRICE_FOR_FIVE_A = MULTI_BUY_OFFERS['A'].find(o => o.quantity === 5).price

            assert.strictEqual(new CheckoutSolution().checkout('AAAAA'), OFFER_PRICE_FOR_FIVE_A)
        })

        it('should return the correct offer price for eight A, selecting the right offers', () => {
            OFFER_PRICE_FOR_FIVE_A = MULTI_BUY_OFFERS['A'].find(o => o.quantity === 5).price
            OFFER_PRICE_FOR_THREE_A = MULTI_BUY_OFFERS['A'].find(o => o.quantity === 3).price

            assert.strictEqual(new CheckoutSolution().checkout('AAAAAAAA'), OFFER_PRICE_FOR_THREE_A + OFFER_PRICE_FOR_FIVE_A)
        })

        it('should return the correct offer price for multiple offers', () => {
            OFFER_PRICE_FOR_FIVE_A = MULTI_BUY_OFFERS['A'].find(o => o.quantity === 5).price
            OFFER_PRICE_FOR_THREE_A = MULTI_BUY_OFFERS['A'].find(o => o.quantity === 3).price

            assert.strictEqual(new CheckoutSolution().checkout('AAABEE'), OFFER_PRICE_FOR_THREE_A + PRICES['E'] * 2)
        })
    })

    describe('CHK_R3 - Item F and new offers', function () {
        const checkout = new CheckoutSolution();

        describe('Item F Basic Functionality', function () {
            it('should return 10 for single F', function () {
                assert.strictEqual(checkout.checkout("F"), 10);
            });

            it('should handle F with other items', function () {
                assert.strictEqual(checkout.checkout("ABCDEF"), 165);
            });
        });

        describe('Item F Buy One Get One Free Offer', function () {
            it('should return 0 for empty F', function () {
                assert.strictEqual(checkout.checkout(""), 0);
            });

            it('should return 10 for single F (no offer)', function () {
                assert.strictEqual(checkout.checkout("F"), 10);
            });

            it('should return 10 for three Fs (buy 2 get 1 free)', function () {
                assert.strictEqual(checkout.checkout("FFF"), 10);
            });

            it('should return 20 for six Fs (buy 2 get 1 free, buy 2 get 1 free)', function () {
                assert.strictEqual(checkout.checkout("FFFFFF"), 20);
            });

            it.skip('should return 30 for five Fs (buy 2 get 1 free, buy 2 get 1 free, 1 at full price)', function () {
                assert.strictEqual(checkout.checkout("FFFFF"), 30);
            });

            it.skip('should handle F offer with other items', function () {
                assert.strictEqual(checkout.checkout("AAAFFFF"), 230);
            });
        });
    });
})
