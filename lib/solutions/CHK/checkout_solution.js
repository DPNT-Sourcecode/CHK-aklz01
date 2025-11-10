'use strict';
const PRICES = require('./inventory/prices');

class CheckoutSolution {
    // skus is expected to be a string
    checkout(skus) {
        if (skus.length === 0)
            return 0;

        if (skus === 'A')
            return PRICES['A'];

        if (skus === 'B')
            return PRICES['B'];

        if (skus === 'C')
            return PRICES['C'];

        if (skus === 'D')
            return PRICES['D'];

        return -1; // default fail case
    }
}

module.exports = CheckoutSolution;


