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
            count_per_sku['B'] = this.applyGetOneFreeOffers(count_per_sku);
        }
            
        let total = 0;
        for (const [sku, qty] of Object.entries(count_per_sku)) {
            total += this.applyMultiBuyOffers(sku, qty);
            
        }

        return total;
    }

    applyMultiBuyOffers(sku, quantity) {
        let total = 0;

        // check for multi buy offers
            if (MULTI_BUY_OFFERS.hasOwnProperty(sku)) {
                let remaining_qty = quantity;
                const offer = MULTI_BUY_OFFERS[sku][0]; // currently only one offer per sku
                const num_offers_applicable = Math.floor(remaining_qty / offer.quantity);
                total += num_offers_applicable * offer.price;
                remaining_qty -= num_offers_applicable * offer.quantity;
                // add remaining items at normal price
                total += remaining_qty * PRICES[sku];
            } else {
                // No offers, just add normal price
                total += quantity * PRICES[sku];
            }
    
        return total;
    }

    applyGetOneFreeOffers(count_per_sku) {
        // First calculate number of free B items from E offers
        const numE = count_per_sku['E'] || 0;
        const freeBs = Math.floor(numE / 2); // Number of free Bs available
        const numB = count_per_sku['B'] || 0;
        const paidBs = Math.max(0, numB - freeBs); // Actual number of Bs to pay for
        return paidBs;
    }
}

module.exports = CheckoutSolution;




