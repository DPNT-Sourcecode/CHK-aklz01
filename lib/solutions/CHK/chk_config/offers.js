
const MULTI_BUY_OFFERS = {
    A: [{ quantity: 3, price: 130 }, { quantity: 5, price: 200 }],
    B: [{ quantity: 2, price: 45 }],
    H: [{ quantity: 5, price: 45 }, { quantity: 10, price: 80 }],
    K: [{ quantity: 2, price: 120 }],
    P: [{ quantity: 5, price: 200 }],
    Q: [{ quantity: 3, price: 80 }],
    V: [{ quantity: 2, price: 90 }, { quantity: 3, price: 130 }],
}

const GET_ONE_FREE_OFFERS = {
    E: { required_quantity: 2, free_sku: 'B' },
    F: { required_quantity: 3, free_sku: 'F' },
    N: { required_quantity: 3, free_sku: 'M' },
    R: { required_quantity: 3, free_sku: 'Q' },
    U: { required_quantity: 4, free_sku: 'U' },
}

const GROUP_OFFERS = {
    'S,T,X,Y,Z': { quantity: 3, price: 45 }
}

module.exports = { GET_ONE_FREE_OFFERS, GROUP_OFFERS, MULTI_BUY_OFFERS };