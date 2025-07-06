require("dotenv").config();
const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendVerificationCode = async (toEmail, code) => {
  const client = SibApiV3Sdk.ApiClient.instance;

  // Configure API key
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  // Create email API instance
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  // Email content
  const sendSmtpEmail = {
    to: [{ email: toEmail }],
    sender: { email: process.env.FROM_EMAIL, name: "Click&Bounce" },
    subject: "Your Verification Code",
    htmlContent: `<p>Your verification code is:</p><h2>${code}</h2><p>It will expire in 5 minutes.</p>`,
  };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent:", response.messageId || response);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

// Example usage
// sendVerificationCode("test@example.com", "123456");
module.exports = sendVerificationCode;
