'use strict';
const PRICES = require('./inventory/prices');

class CheckoutSolution {
    // skus is expected to be a string
    checkout(skus) {
        if (skus.length === 0)
            return 0;

        if (!PRICES.hasOwnProperty(skus))
            return -1;

        return PRICES[skus];
    }
}

module.exports = CheckoutSolution;



