'use strict';
const {OffersEngine, makeGetOneFreeHandler, makeMultiBuyHandler} = require('./offers_engine');
const { GET_ONE_FREE_OFFERS, MULTI_BUY_OFFERS, PRICES } = require('./config');

class CheckoutSolution {
    constructor() {
        const offerHandlers = [
            makeGetOneFreeHandler(GET_ONE_FREE_OFFERS),
            makeMultiBuyHandler(MULTI_BUY_OFFERS),
        ];
        this.offersEngine = new OffersEngine)(offerHandlers, { PRICES });
    }

    // skus is expected to be a string
    // skus is expected to be a string
    checkout(skus) {
        if (typeof skus !== 'string') return -1;
        if (skus.length === 0) return 0;

        const count_per_sku = {};
        for (let sku of skus) {
            if (!PRICES.hasOwnProperty(sku)) return -1;
            count_per_sku[sku] = (count_per_sku[sku] || 0) + 1;
        }

        // base total = sum of unit prices for all items
        let baseTotal = 0;
        for (const [sku, qty] of Object.entries(count_per_sku)) {
            baseTotal += (PRICES[sku] || 0) * qty;
        }

        // apply offers (handlers will consume SKUs in order and return total discount)
        const { discount, remaining } = this.offersEngine.applyOffers(count_per_sku);

        // final total = baseTotal - discount
        const finalTotal = baseTotal - discount;

        // (remaining is returned for transparency/possible debugging though not used further here)
        return finalTotal;
    }
}

module.exports = CheckoutSolution;

