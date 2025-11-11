class OffersEngine {
    /**
     * @param {Funtion[]} offreHandlers - Array of functions: handler() => {discunt: number, remaining: Object} that process offers in order.
     * @param {Object} context - Context object for the handlers e.g. inventory data (prices)
     */
    constructor(offreHandlers = [], context = {}) {
        this.offreHandlers = offreHandlers;
        this.context = context;
    }

    /**
     * Apply all offers in sequence to the given basket
     * @param {Object} basket - Object with sku as key and quantity as value
     * @returns {{discount: NumberConstructor, remaining: Object}} - Object with total discount and remaining items not affected by offers
     */
    applyOffers(basket) {
        let totalDiscount = 0;
        let current = { ...basket };
        for (const handler of this.offreHandlers) {
            const result = handler(current, this.context);
            if (!result) continue;
            const { discount = 0, remaining } = result;
            totalDiscount += discount;
            if (remaining && typeof remaining === 'object') {
                // use remaining for next handlers
                current = { ...remaining };
            }
        }

        return { discount: totalDiscount, remaining: current };
    }
}

/**
 * Factory: handler that applies multi-buy offers (e.g. 5A for 200, 3A for 130).
 * It consumes the sku quantities used by the multi-buy offers and returns discount (saved amount)
 * relative to unit prices and the remaining items not affected by the offers.
 */
function makeMultiBuyHandler(offersConfig) {
    return function multiBuyHandler(sku_counts, context) {
        const remaining = { ...sku_counts };
        const PRICES = context.PRICES || {};
        let discount = 0;

        for (const [sku, offers] of Object.entries(offersConfig || {})) {
            let qty = remaining[sku] || 0;
            if (qty <= 0) continue;

            // apply largest offers first
            const sortedOffers = (offers || []).slice().sort((a, b) => b.quantity - a.quantity);
            let appliedQty = 0;
            let totalOfferPrice = 0;

            for (const offer of sortedOffers) {
                const n = Math.floor(qty / offer.quantity);
                if (n > 0) {
                    appliedQty += n * offer.quantity;
                    totalOfferPrice += n * offer.price;
                    qty -= n * offer.quantity;
                }
            }

            if (appliedQty > 0) {
                const unitTotal = appliedQty * (PRICES[sku] || 0);
                discount += (unitTotal - totalOfferPrice);
            }

            remaining[sku] = qty;
        }

        return { discount, remaining };

    }
}

/**
 * Factory: handler that applies all "get one free" offers defined in GET_ONE_FREE_OFFERS.
 * It consumes qualifier SKUs (e.g. E) and the free SKUs (e.g. B) and returns discount and remaining counts.
 */
function makeGetOneFreeHandler(offers_config) {
    return function getOneFreeHandler(sku_counts, context) {
        if (!offers_config || isValidOffersConfig(offers_config)) {
            return { discount: 0, remaining: { ...sku_counts } };
        }

        const remaining = { ...sku_counts };
        const PRICES = context.PRICES || {};
        let discount = 0;

        for (const [qualifierSku, offer] of Object.entries(offers_config || {})) {
            const required = offer.required_quantity;
            const freeSku = offer.free_sku;
            const qualifierCount = remaining[qualifierSku] || 0;
            if (qualifierCount < required) continue;

            const numOffers = Math.floor(qualifierCount / required);
            const freeAvailable = remaining[freeSku] || 0;
            if (freeAvailable <= 0) continue;

            const freeApplied = Math.min(numOffers, freeAvailable);
            discount += freeApplied * (PRICES[freeSku] || 0);

            // consume free items and qualifiers
            remaining[freeSku] = Math.max(0, freeAvailable - freeApplied);
        }

        return { discount, remaining }
    }
}

function isValidOffersConfig(offers_config) {
    return Object.values(offers_config).every(offer =>
        offer && typeof offer === 'object' &&
        'required_quantity' in offer &&
        'free_sku' in offer
    );
}

module.exports = { OffersEngine, makeMultiBuyHandler, makeGetOneFreeHandler };
