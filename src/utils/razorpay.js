const Razorpay = require('razorpay');
const { CONFIG } = require('../config/config');

//RazorPay instance
const razorpayInstance = new Razorpay({
    key_id: CONFIG.razorPayKeyId,
    key_secret: CONFIG.razorPayKeySecret,
});

//create customer
const createCustomer = async (email, name, contact) => {
    try {
        const customer = await razorpayInstance.customers.create({
            name,
            email,
            contact
        });
        return customer;
    } catch (error) {
        console.error("Error creating customer:", error);
        throw new Error("Failed to create customer");
    }
};

//check existing cutomer
const checkCustomer = async (customerId) => {
    try {
        const customer = await razorpayInstance.customers.fetch(customerId);
        return customer;
    } catch (error) {
        if (error.statusCode === 400 && error.error.code === 'BAD_REQUEST_ERROR') {
            console.warn("Customer not found:", error.error.description);
            return null;
        }
        console.error("Error fetching customer:", error);
        throw new Error("Failed to fetch customer");
    }
};

//create new subscription
const createSubscription = async (planId) => {
    try {
        const startAt = Math.floor(Date.now() / 1000) + 3600;

        const subscription = razorpayInstance.subscriptions.create({
            plan_id: planId,
            customer_notify: 1,
            quantity: 1,
            total_count: 12,
        });

        return subscription;
    } catch (error) {
        console.error("Error creating subscription:", error);
        throw new Error("Failed to create subscription", error);
    }
};

//get subscription details
const generateSubscriptionDetails = async (subscriptionId) => {
    try {
        const subscription = await razorpayInstance.subscriptions.fetch(subscriptionId);
        return subscription;
    } catch (error) {
        console.error("Error creating subscription:", error);
        throw new Error("Failed to create subscription");
    }
}

//create plan
const createPlan = async (options) => {
    try {
        const plan = await razorpayInstance.plans.create(options);
        return plan;
    } catch (error) {
        console.error("Error creating plan:", error);
        throw new Error("Failed to create plan");
    }
}

//get all plans
const getPlans = async () => {
    try {
        return await razorpayInstance.plans.all();
    } catch (error) {
        throw new Error("Failed to fetch plans");
    }
}

//create order
const createNewOrder = async (options) => {
    try {
        const order = await razorpayInstance.orders.create(options);
        return order;
    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Failed to create order");
    }
}

//get order details by recipt
const getOrderDetailsById = async (orderId) => {
    try {
        const orderDetails = await razorpayInstance.orders.fetch(orderId);
        return orderDetails;
    } catch (error) {
        console.error("Error fetching order details:", error);
        throw new Error("Failed to fetch order details");
    }
}

module.exports = {
    createSubscription,
    createCustomer,
    checkCustomer,
    generateSubscriptionDetails,
    createPlan,
    getPlans,
    createNewOrder,
    getOrderDetailsById
};
