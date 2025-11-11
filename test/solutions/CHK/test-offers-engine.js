var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const { OffersEngine, makeMultiBuyHandler, makeGetOneFreeHandler } = require('../../../lib/solutions/CHK/offers_engine');
const { GET_ONE_FREE_OFFERS, MULTI_BUY_OFFERS, PRICES } = require('../../../lib/solutions/CHK/config')

describe('CHK Challenge: OffersEngine.applyOffers(basket) -> {discount: number, remaining: Object}', function () {

    describe('Multi-Buy Offers', () => {
        it('should return zero discount and same basket when no offers are applied', () => {
            const offersEngine = new OffersEngine([makeMultiBuyHandler(MULTI_BUY_OFFERS)], { PRICES });
            const basket = { A: 1, B: 1 };
            const { discount, remaining } = offersEngine.applyOffers(basket);
            
            assert.strictEqual(discount, 0);
            assert.deepStrictEqual(remaining, basket);
        })

        it('should apply 3A for 130 offer', () => {
            const offersEngine = new OffersEngine([makeMultiBuyHandler(MULTI_BUY_OFFERS)], { PRICES });
            const basket = { A: 3 };
            const { discount, remaining } = offersEngine.applyOffers(basket);
            
            // Unit price: 3 * 50 = 150, offer price = 130, discount = 20
            assert.strictEqual(discount, 20);
            assert.deepStrictEqual(remaining, { A: 0 });
        })

        it('should apply 5A for 200 offer', () => {
            const engine = new OffersEngine([makeMultiBuyHandler(MULTI_BUY_OFFERS)], { PRICES });
            const { discount, remaining } = engine.applyOffers({ A: 5 });
            
            // Unit price: 5 * 50 = 250, offer price = 200, discount = 50
            assert.strictEqual(discount, 50);
            assert.deepStrictEqual(remaining, { A: 0 });
        });

        it('should apply largest offer first (6A)', () => {
            const engine = new OffersEngine([makeMultiBuyHandler(MULTI_BUY_OFFERS)], { PRICES });
            const { discount, remaining } = engine.applyOffers({ A: 6 });
            
            // 5A for 200 (discount 50) + 1A at 50 (no discount) = total 50
            assert.strictEqual(discount, 50);
            assert.deepStrictEqual(remaining, { A: 1 });
        });

        it('should apply 8A correctly (5A + 3A offers)', () => {
            const engine = new OffersEngine([makeMultiBuyHandler(MULTI_BUY_OFFERS)], { PRICES });
            const { discount, remaining } = engine.applyOffers({ A: 8 });
            
            // 5A for 200 (discount 50) + 3A for 130 (discount 20) = total 70
            assert.strictEqual(discount, 70);
            assert.deepStrictEqual(remaining, { A: 0 });
        });

        it('should apply 2B for 45 offer', () => {
            const engine = new OffersEngine([makeMultiBuyHandler(MULTI_BUY_OFFERS)], { PRICES });
            const { discount, remaining } = engine.applyOffers({ B: 2 });
            
            // Unit price: 2 * 30 = 60, offer price = 45, discount = 15
            assert.strictEqual(discount, 15);
            assert.deepStrictEqual(remaining, { B: 0 });
        });

        it('should handle multiple SKUs with offers', () => {
            const engine = new OffersEngine([makeMultiBuyHandler(MULTI_BUY_OFFERS)], { PRICES });
            const { discount, remaining } = engine.applyOffers({ A: 3, B: 2 });
            
            // 3A: discount 20, 2B: discount 15, total = 35
            assert.strictEqual(discount, 35);
            assert.deepStrictEqual(remaining, { A: 0, B: 0 });
        });
    })

    describe('Get One Free Offers', () => {
        it('should return a zero discount if not items qualify', ()=> {
            const offersEngine = new OffersEngine([makeGetOneFreeHandler(GET_ONE_FREE_OFFERS)], { PRICES });
            const basket = { B: 2};
            const { discount, remaining } = offersEngine.applyOffers(basket);

            assert.strictEqual(discount, 0);
            assert.deepStrictEqual(remaining, basket);
        })

        it('should return zero discount when free item not present', function () {
            const engine = new OffersEngine([makeGetOneFreeHandler(GET_ONE_FREE_OFFERS)], { PRICES });
            const { discount, remaining } = engine.applyOffers({ E: 2 });
            // 2E qualifies for 1B free, but no B present
            assert.strictEqual(discount, 0);
            assert.deepStrictEqual(remaining, { E: 2 });
        });

        it('should apply 2E get 1B free', function () {
            const engine = new OffersEngine([makeGetOneFreeHandler(GET_ONE_FREE_OFFERS)], { PRICES });
            const { discount, remaining } = engine.applyOffers({ E: 2, B: 1 });
            // 2E qualifies for 1B free, 1B available, discount = 1 * 30 = 30
            assert.strictEqual(discount, 30);
            assert.deepStrictEqual(remaining, { E: 2, B: 0 });
        });

        it('should apply 2E get 1B free with multiple Bs', function () {
            const engine = new OffersEngine([makeGetOneFreeHandler(GET_ONE_FREE_OFFERS)], { PRICES });
            const { discount, remaining } = engine.applyOffers({ E: 2, B: 3 });
            // 2E qualifies for 1B free, 3B available, only 1 free applied, discount = 30
            assert.strictEqual(discount, 30);
            assert.deepStrictEqual(remaining, { E: 2, B: 2 });
        });

        it('should apply 4E get 2B free', function () {
            const engine = new OffersEngine([makeGetOneFreeHandler(GET_ONE_FREE_OFFERS)], { PRICES });
            const { discount, remaining } = engine.applyOffers({ E: 4, B: 3 });
            // 4E qualifies for 2B free, 3B available, 2 free applied, discount = 2 * 30 = 60
            assert.strictEqual(discount, 60);
            assert.deepStrictEqual(remaining, { E: 4, B: 1 });
        });
    })

    describe('Combined Offers (Sequential) (I asked Claude to add more tests)', function () {
        it('should apply get one free first, then multi-buy', function () {
            const handlers = [
                makeGetOneFreeHandler(GET_ONE_FREE_OFFERS),
                makeMultiBuyHandler(MULTI_BUY_OFFERS)
            ];
            const engine = new OffersEngine(handlers, { PRICES });
            const { discount, remaining } = engine.applyOffers({ E: 2, B: 2, A: 3 });
            // First: 2E get 1B free -> discount 30, remaining { E: 2, B: 1, A: 3 }
            // Then: 3A for 130 -> discount 20, remaining { E: 2, B: 1, A: 0 }
            // Total discount: 50
            assert.strictEqual(discount, 50);
            assert.deepStrictEqual(remaining, { E: 2, B: 1, A: 0 });
        });

        it('should handle empty input', function () {
            const engine = new OffersEngine([
                makeGetOneFreeHandler(GET_ONE_FREE_OFFERS),
                makeMultiBuyHandler(MULTI_BUY_OFFERS)
            ], { PRICES });
            const { discount, remaining } = engine.applyOffers({});
            assert.strictEqual(discount, 0);
            assert.deepStrictEqual(remaining, {});
        });

        it('should handle no applicable offers', function () {
            const engine = new OffersEngine([
                makeGetOneFreeHandler(GET_ONE_FREE_OFFERS),
                makeMultiBuyHandler(MULTI_BUY_OFFERS)
            ], { PRICES });
            const { discount, remaining } = engine.applyOffers({ C: 1, D: 2 });
            assert.strictEqual(discount, 0);
            assert.deepStrictEqual(remaining, { C: 1, D: 2 });
        });
    });
})