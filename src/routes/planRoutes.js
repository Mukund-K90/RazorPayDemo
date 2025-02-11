const express = require('express');
const { getAllPlans, createNewPlan } = require('../controller/planController');
const router = express.Router();

//create new plan
router.post('/create', createNewPlan);
//fetch all plans
router.get('/list', getAllPlans);

module.exports = router;