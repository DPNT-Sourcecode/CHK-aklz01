const PRICES = {
    A: 50,
    B: 30,
    C: 20,
    D: 15
}

const MULTI_BUY_OFFERS = {
    A: [{ quantity: 3, price: 130 }], //use array to allow for multiple offers in future
    B: [{ quantity: 2, price: 45 }]
}

module.exports = {  PRICES, MULTI_BUY_OFFERS };