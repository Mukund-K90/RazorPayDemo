const express = require('express');
const { getAllPlans, buySubscription, getSubscriptionDetails } = require('../controller/subscriptionController');
const router = express.Router();

//fetch all plans
router.get('/plans', getAllPlans);
//buy subscription
router.post('/buy', buySubscription);
//get subscription details
router.get('/details/:subscriptionId', getSubscriptionDetails);

module.exports = router;