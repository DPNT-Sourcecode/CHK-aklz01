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
        let remainingBasket = { ...basket };
        return { discount: totalDiscount, remaining: remainingBasket };
    }
}
