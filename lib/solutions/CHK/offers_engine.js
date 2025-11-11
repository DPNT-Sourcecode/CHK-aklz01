class OffersEngine {
    /**
     * @param {Funtion[]} offreHandlers - Array of functions: handler() => {discunt: number, remaining: Object} that process offers in order.
     * @param {Object} context - Context object for the handlers e.g. inventory data (prices)
     */
    constructor(offreHandlers = [], context = {}) {
        this.offreHandlers = offreHandlers;
        this.context = context;
    }
}
