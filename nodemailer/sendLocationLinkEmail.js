
// import { transporter, sender } from "./nodemailer.config.js";
// import { LOCATION_SHARING_EMAIL_TEMPLATE } from "./emailTemplates.js";

// export const sendLocationLinkEmail = async (email, link) => {
//   try {
//     const response = await transporter.sendMail({
//       from: sender,
//       to: email,
//       subject: "📍 SOS Location Shared with You",
//       html: LOCATION_SHARING_EMAIL_TEMPLATE.replace("{link}", link),
//       category: "Location Sharing email",
//     });

//     console.log("Email sent successfully", response);
//   } catch (error) {
//     console.error("Error sending Location Sharing email:", error);
//     throw new Error(`Error sending Location Sharing email: ${error.message}`);
//   }
// };
import { brevoClient, sender } from "./nodemailer.config.js";
import { LOCATION_SHARING_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendLocationLinkEmail = async (email, link) => {
  try {
    // Build the HTML email content
    const htmlContent = LOCATION_SHARING_EMAIL_TEMPLATE.replace("{link}", link);

    // Send via Brevo API (HTTPS, works on Render)
    const response = await brevoClient.sendTransacEmail({
      sender,                     // Sender details from .env
      to: [{ email }],            // Recipient
      subject: "📍 SOS Location Shared with You",
      htmlContent,                // HTML body
      tags: ["Location Sharing"], // Optional category/tag
    });

    console.log("✅ Location sharing email sent successfully:", response.messageId);
  } catch (error) {
    console.error("❌ Error sending location sharing email:", error.response?.body || error.message);
    throw new Error(`Error sending Location Sharing email: ${error.message}`);
  }
};
