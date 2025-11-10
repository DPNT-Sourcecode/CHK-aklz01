'use strict';
const { PRICES, MULTI_BUY_OFFERS } = require('./inventory/prices');

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

        let remaining_skus = this.applyGetOneFreeOffers(count_per_sku);

        let [total, remaining_skus_after_offer] = this.applyMultiBuyOffers(remaining_skus);

        for (const [sku, qty] of Object.entries(remaining_skus_after_offer)) {
            if (qty > 0) {
                total += qty * PRICES[sku];
            }
        }
        return total;
    }

    applyMultiBuyOffers(sku_count) {
        const remaining_skus = { ...sku_count };

        let total = 0;

        for (const [sku, offers] of Object.entries(MULTI_BUY_OFFERS)) {
            if (!remaining_skus[sku]) {
                continue;
            }

            let quantity = remaining_skus[sku];
            const sorted_offers = offers.sort((a, b) => b.quantity - a.quantity);

            for (const offer of sorted_offers) {
                const num_offers_applicable = Math.floor(quantity / offer.quantity);
                if (num_offers_applicable > 0) {
                    total += num_offers_applicable * offer.price;
                    quantity -= num_offers_applicable * offer.quantity;
                }
            }

            remaining_skus[sku] = quantity;
        }

        return total, remaining_skus;
    }

    applyGetOneFreeOffers(sku_count) {

        const remaining = { ...sku_count }

        if (remaining['E'] >= 2 && remaining['B']) {
            const numE = remaining['E'];
            const freeBs = Math.floor(numE / 2);
            remaining['B'] = Math.max(0, remaining['B'] - freeBs);

        }
        return remaining;
    }
}

module.exports = CheckoutSolution;

