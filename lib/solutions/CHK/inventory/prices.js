const PRICES = {
    A: 50,
    B: 30,
    C: 20,
    D: 15,
    E: 40
}

const MULTI_BUY_OFFERS = {
    A: [{ quantity: 3, price: 130 }], //use array to allow for multiple offers in future
    B: [{ quantity: 2, price: 45 }]
}

const GET_ONE_FREE_OFFERS = {
    E: { required_quantity: 2, free_sku: 'B' }
}

module.exports = {  PRICES, MULTI_BUY_OFFERS };