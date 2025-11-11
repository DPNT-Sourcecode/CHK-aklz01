var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const OffersEngine = require('../../../lib/solutions/CHK/offers_engine');
const { GET_ONE_FREE_OFFERS, MULTI_BUY_OFFERS, PRICES } = require('../../../lib/solutions/CHK/config')