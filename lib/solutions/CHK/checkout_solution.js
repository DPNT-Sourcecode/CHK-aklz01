'use strict';
const {PRICES, MULTI_BUY_OFFERS} = require('./inventory/prices');

class CheckoutSolution {
    // skus is expected to be a string
    checkout(skus) {
        if (skus.length === 0)
            return 0;

        if (typeof skus !== 'string') {
            return -1;
        }

        const count_per_sku = {};
        for (let sku of skus) {
            if (!PRICES.hasOwnProperty(sku))
                return -1;
            count_per_sku[sku] = (count_per_sku[sku] || 0) + 1;
        }
            
        let total = 0;
        return total;
    }
}

module.exports = CheckoutSolution;


