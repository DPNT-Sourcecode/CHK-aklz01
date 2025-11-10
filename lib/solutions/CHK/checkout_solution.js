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

        const remaining_skus = this.applyGetOneFreeOffers(count_per_sku);

        for (const [sku, qty] of Object.entries(remaining_skus)) {
            total += this.applyMultiBuyOffers(sku, qty);
            
        }

        return total;
    }

    applyMultiBuyOffers(count_per_sku) {
        const remaining_skus = [...count_per_sku];

        let total = 0;

        for (const [sku, offers] of Object.entries(MULTI_BUY_OFFERS)) {
            if (!remaining_skus[sku]) {
                continue;
            }
            
            let quantity = remaining_skus[sku];
            const


        // // check for multi buy offers
        //     if (MULTI_BUY_OFFERS.hasOwnProperty(sku)) {
        //         let remaining_qty = quantity;
        //         const offer = MULTI_BUY_OFFERS[sku][0]; // currently only one offer per sku
        //         const num_offers_applicable = Math.floor(remaining_qty / offer.quantity);
        //         total += num_offers_applicable * offer.price;
        //         remaining_qty -= num_offers_applicable * offer.quantity;
        //         // add remaining items at normal price
        //         total += remaining_qty * PRICES[sku];
        //     } else {
        //         // No offers, just add normal price
        //         total += quantity * PRICES[sku];
        //     }
    
        return total;
    }

    applyGetOneFreeOffers(count_per_sku) {

        const remaining = {...count_per_sku}

        if (remaining['E'] >= 2 && remaining['B']) {
            const numE = remaining['E'];
            const freeBs = Math.floor(numE / 2);
            remaining['B'] = Math.max(0, remaining['B'] - freeBs);

        }
        return remaining;
    }
}

module.exports = CheckoutSolution;


