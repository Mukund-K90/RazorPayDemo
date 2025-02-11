const express = require('express');
const { createOrder, getOrderDetails } = require('../controller/orderContoller');
const router = express.Router();

//create order
router.post('/create',createOrder );
//get order details
router.get('/details/:receiptId',getOrderDetails);

module.exports = router;