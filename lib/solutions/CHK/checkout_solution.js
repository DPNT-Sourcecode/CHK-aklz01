'use strict';
const PRICES = require('./inventory/prices');

class CheckoutSolution {
    // skus is expected to be a string
    checkout(skus) {
        if (skus.length === 0)
            return 0;

        let total = 0;
        for (let sku in skus) {
            if (!PRICES.hasOwnProperty(sku))
                return -1;
            total += PRICES[sku];
        }

        return total;
    }
}

module.exports = CheckoutSolution;




