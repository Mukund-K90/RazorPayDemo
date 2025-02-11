const { createSubscription, createCustomer, generateSubscriptionLink, getPlans, generateSubscriptionDetails } = require("../utils/razorpay");
const crypto = require('crypto');

//get all plans
exports.getAllPlans = async (req, res) => {
    try {
        const plans = await getPlans();
        res.status(200).json({
            message: 'All plans fetched successfully',
            status: "success",
            data: plans.items
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//buySubscription
exports.buySubscription = async (req, res) => {

    try {
        const { planId } = req.body;

        const subscription = await createSubscription(planId);

        const redirect_link = subscription.short_url;

        return res.status(201).json({
            message: "Subscription created successfully",
            success: true, redirectLink: redirect_link, subscriptionId: subscription.id,
            subscriptionKey: subscription.key_id,
            shortUrl: subscription.short_url,
            planAmount: subscription.amount
        });

    } catch (error) {
        console.error("Subscription error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

//get subcription details
exports.getSubscriptionDetails = async (req, res) => {
    try {
        const { subscriptionId } = req.params;
        const subscription = await generateSubscriptionDetails(subscriptionId);       
         
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: subscription
        });
    } catch (error) {

    }
}
