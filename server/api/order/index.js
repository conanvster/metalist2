'use strict';

const express = require('express');
const controller = require('./order.controller');
import * as auth from '../../auth/auth.service';

const router = express.Router();

router.post('/checkout', auth.isAuthenticated(), controller.checkout);
router.get('/order/:privateId', controller.getOrderByPrivateId);
router.post('/pay-cashier', auth.hasRole('cashier'), controller.payCashier);
router.get('/payment-status', auth.isAuthenticated(), controller.getPaymentStatus);
router.post('/liqpay-redirect', controller.liqpayRedirect);
router.post('/liqpay-callback', controller.liqpayCallback);

module.exports = router;
