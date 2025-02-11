require('dotenv').config();  // Load environment variables from .env file

exports.CONFIG = {
   
    port: process.env.PORT || 3000,
    razorPayKeyId: process.env.RAZORPAY_KEY_ID,
    razorPayKeySecret: process.env.RAZORPAY_KEY_SECRET,
};

