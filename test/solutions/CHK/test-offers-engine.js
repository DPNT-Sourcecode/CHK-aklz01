var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const OffersEngine = require('../../../lib/solutions/CHK/offers_engine');
const { GET_ONE_FREE_OFFERS, MULTI_BUY_OFFERS, PRICES } = require('../../../lib/solutions/CHK/config')

describe('CHK Challenge: OffersEngine.applyOffers(basket) -> {discount: number, remaining: Object}', function () {

    describe('Multi-Buy Offers', () => {
        it('should return zero discount and same basket when no offers are applied', () => {
            const offersEngine = new OffersEngine([], { PRICES });
            const basket = { 'A': 1, 'B': 1 };
            const { discount, remaining } = offersEngine.applyOffers(basket);
            assert.strictEqual(discount, 0);
            assert.deepStrictEqual(remaining, basket);
        })
    })
})