
// import {
//   PASSWORD_RESET_REQUEST_TEMPLATE,
//   PASSWORD_RESET_SUCCESS_TEMPLATE,
//   VERIFICATION_EMAIL_TEMPLATE,
//   WELCOME_EMAIL_TEMPLATE,
//   CONTACT_US_EMAIL_TEMPLATE,
//   CONTACT_US_EMAIL_TEMPLATE_COPY_TO_USER,
// } from "./emailTemplates.js";

// import { transporter, sender, adminEmail } from "./nodemailer.config.js";

// export const sendVerificationEmail = async (email, verificationToken) => {
//   try {
//     const response = await transporter.sendMail({
//       from: sender,
//       to: email,
//       subject: "Verify your email",
//       html: VERIFICATION_EMAIL_TEMPLATE.replace(
//         "{verificationCode}",
//         verificationToken
//       ),
//       category: "Email Verification",
//     });

//     console.log("Email sent successfully", response);
//   } catch (error) {
//     console.error(`Error sending verification`, error);

//     throw new Error(`Error sending verification email: ${error}`);
//   }
// };

// export const sendWelcomeEmail = async (email, name) => {
//   try {
//     const response = await transporter.sendMail({
//       from: sender,
//       to: email,
//       subject: "User created Successful",
//       html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name),
//       category: "User created",
//     });

//     console.log("Welcome email sent successfully", response);
//   } catch (error) {
//     console.error(`Error sending welcome email`, error);

//     throw new Error(`Error sending welcome email: ${error}`);
//   }
// };

// export const sendPasswordResetEmail = async (email, resetURL) => {
//   try {
//     const response = await transporter.sendMail({
//       from: sender,
//       to: email,
//       subject: "Reset your password",
//       html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
//       category: "Password Reset",
//     });
//   } catch (error) {
//     console.error(`Error sending password reset email`, error);

//     throw new Error(`Error sending password reset email: ${error}`);
//   }
// };

// export const sendResetSuccessEmail = async (email) => {
//   try {
//     const response = await transporter.sendMail({
//       from: sender,
//       to: email,
//       subject: "Password Reset Successful",
//       html: PASSWORD_RESET_SUCCESS_TEMPLATE,
//       category: "Password Reset",
//     });

//     console.log("Password reset email sent successfully", response);
//   } catch (error) {
//     console.error(`Error sending password reset success email`, error);

//     throw new Error(`Error sending password reset success email: ${error}`);
//   }
// };


// export const contactUsEmail = async (email, name, query) => {
//   try {
//     const response = await transporter.sendMail({
//       from: email, // Who sent it
//       to: adminEmail,
//       subject: `Query Mail by ${name}`,
//       html: CONTACT_US_EMAIL_TEMPLATE.replace("{userName}", name)
//         .replace("{userEmail}", email)
//         .replace("{userMessage}", query),

//       category: "Contact by user",
//     });

//     console.log("Query sent successfully", response);
//   } catch (error) {
//     console.error(`Error sending query`, error);
//     throw new Error(`Error sending query: ${error}`);
//   }
// };

// export const sendCopyOfContactUsEmailToUser = async (email, name, query) => {
//   try {
//     const response = await transporter.sendMail({
//       from: sender, // Who sent it
//       to: email,
//       subject: `Query Mail by ${name} (Copy)`,
//       html: CONTACT_US_EMAIL_TEMPLATE_COPY_TO_USER.replaceAll("{userName}", name)
//         .replace("{userEmail}", email)
//         .replace("{userMessage}", query),
//       category: "Contact by user Copy to user",
//     });

//     console.log("Query sent successfully", response);
//   } catch (error) {
//     console.error(`Error sending query`, error);
//     throw new Error(`Error sending query: ${error}`);
//   }
// };
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  CONTACT_US_EMAIL_TEMPLATE,
  CONTACT_US_EMAIL_TEMPLATE_COPY_TO_USER,
} from "./emailTemplates.js";

import { brevoClient, sender, adminEmail } from "./nodemailer.config.js";

// Generic function to send transactional emails
async function sendBrevoEmail({ to, subject, htmlContent, category }) {
  try {
    const response = await brevoClient.sendTransacEmail({
      sender,
      to: [{ email: to }],
      subject,
      htmlContent,
      tags: [category],
    });

    console.log(`✅ Email sent to ${to} (Message ID: ${response.messageId})`);
    return response;
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error.response?.body || error.message);
    throw error;
  }
}

// 1️⃣ Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
  const html = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken);
  return sendBrevoEmail({
    to: email,
    subject: "Verify your email",
    htmlContent: html,
    category: "Email Verification",
  });
};

// 2️⃣ Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  const html = WELCOME_EMAIL_TEMPLATE.replace("{userName}", name);
  return sendBrevoEmail({
    to: email,
    subject: "Welcome to SOS Alert 🚀",
    htmlContent: html,
    category: "Welcome Email",
  });
};

// 3️⃣ Password Reset Request
export const sendPasswordResetEmail = async (email, resetURL) => {
  const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);
  return sendBrevoEmail({
    to: email,
    subject: "Reset your password",
    htmlContent: html,
    category: "Password Reset",
  });
};

// 4️⃣ Password Reset Success
export const sendResetSuccessEmail = async (email) => {
  return sendBrevoEmail({
    to: email,
    subject: "Password Reset Successful",
    htmlContent: PASSWORD_RESET_SUCCESS_TEMPLATE,
    category: "Password Reset Success",
  });
};

// 5️⃣ Contact Us - send to admin
export const contactUsEmail = async (email, name, query) => {
  const html = CONTACT_US_EMAIL_TEMPLATE.replace("{userName}", name)
    .replace("{userEmail}", email)
    .replace("{userMessage}", query);

  return sendBrevoEmail({
    to: adminEmail,
    subject: `Query from ${name}`,
    htmlContent: html,
    category: "Contact Us (Admin)",
  });
};

// 6️⃣ Copy of Contact Us - send to user
export const sendCopyOfContactUsEmailToUser = async (email, name, query) => {
  const html = CONTACT_US_EMAIL_TEMPLATE_COPY_TO_USER.replaceAll("{userName}", name)
    .replace("{userEmail}", email)
    .replace("{userMessage}", query);

  return sendBrevoEmail({
    to: email,
    subject: `We received your query, ${name}`,
    htmlContent: html,
    category: "Contact Us Copy to User",
  });
};
