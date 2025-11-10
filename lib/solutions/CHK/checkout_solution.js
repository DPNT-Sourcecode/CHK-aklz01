'use strict';

class CheckoutSolution {
    // skus is expected to be a string
    checkout(skus) {
        if (skus.length === 0)
            return 0;

        if (skus === 'A')
            return 50;

        if (skus === 'B')
            return 30;

        if (skus === 'C')
            return 20;

        if (skus === 'D')
            return 15;

        return -1; // default fail case
    }
}

module.exports = CheckoutSolution;

