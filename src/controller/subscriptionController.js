const { createSubscription, generateSubscriptionDetails } = require("../utils/razorpay");

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
