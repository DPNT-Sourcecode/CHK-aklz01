
const MULTI_BUY_OFFERS = {
    A: [{ quantity: 3, price: 130 }, {quantity: 5, price: 200}], //use array to allow for multiple offers in future
    B: [{ quantity: 2, price: 45 }]
}

const GET_ONE_FREE_OFFERS = {
    E: { required_quantity: 2, free_sku: 'B' },
    F: { required_quantity: 2, free_sku: 'F' }
}

module.exports = { GET_ONE_FREE_OFFERS, MULTI_BUY_OFFERS };