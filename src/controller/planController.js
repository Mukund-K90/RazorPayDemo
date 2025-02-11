const { createPlan, getPlans } = require("../utils/razorpay");

//create plan
exports.createNewPlan = async (req, res) => {
    try {
        const { period, interval, amount, currency, name, description } = req.body;
        const options = {
            period,
            interval,
            item: {
                name,
                amount,
                currency,
                description
            }
        }
        const plan = await createPlan(options);
        if (!plan) {
            return res.status(400).json({ message: "Failed to create plan" });
        }
        return res.status(200).json({
            success: true,
            message: "Plan created successfully",
            plan
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

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
