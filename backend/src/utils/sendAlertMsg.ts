// import AWS from "aws-sdk"
import Config from "../config/Config";
import logger from "../config/logger";
// Configure AWS SNS
AWS.config.update({
    region: Config.AWS_REGION, // Change to your AWS SNS region
    accessKeyId: Config.AWS_ACCESS_ID,
    secretAccessKey: Config.AWS_SECRET_KEY,
});

const sns = new AWS.SNS();

/**
 * Function to send OTP to multiple phone numbers
 * @param {string[]} phoneNumbers - Array of phone numbers in E.164 format
 */
const sendOTPs = async (phoneNumbers: string[], url: string) => {
    try {
        const results = await Promise.all(
            phoneNumbers.map(async (phoneNumber: string) => {
                const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate OTP

                const params = {
                    Message: `Your friend has been sent an alert check his/her location:
                    url: ${url}`,
                    PhoneNumber: phoneNumber, // Must be in E.164 format
                };

                const response = await sns.publish(params).promise();
                logger.info(`OTP sent to ${phoneNumber}:`, response);

                return { phoneNumber, success: true, otp }; // Return OTP (store for verification if needed)
            })
        );

        return results;
    } catch (error) {
        logger.error("Error sending OTPs:", error);
        // return { success: false, error: error.message };
    }
};

// Example usage with an array of numbers
export default sendOTPs;

