// import dotenv from "dotenv";
// import nodemailer from "nodemailer";

// dotenv.config();


// export const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST, 
//   port: process.env.EMAIL_PORT, 
//   secure: false, 
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, 
//   },
// });


// export const sender = {
//   email: process.env.SENDER_EMAIL,
//   name: process.env.SENDER_NAME,
// };

// export const adminEmail = process.env.ADMIN_EMAIL;

// transporter.verify(function (error, success) {
//   if (error) {
//     console.error("Error connecting to email server:", error);
//   } else {
//     console.log("Email server is ready to send messages");
//   }
// });


// // import dotenv from "dotenv";
// // import nodemailer from "nodemailer";

// // dotenv.config();

// // // ✅ Brevo SMTP transporter
// // export const transporter = nodemailer.createTransport({
// //   host: process.env.BREVO_HOST || "smtp-relay.brevo.com",
// //   port: Number(process.env.BREVO_PORT) || 587,
// //   secure: false, // Brevo uses STARTTLS on port 587
// //   auth: {
// //     user: process.env.BREVO_USER, // your Brevo login email
// //     pass: process.env.BREVO_PASS, // the SMTP key generated in Brevo dashboard
// //   },
// // });

// // // ✅ Sender details
// // export const sender = {
// //   email: process.env.SENDER_EMAIL || process.env.BREVO_USER,
// //   name: process.env.SENDER_NAME || "SOS Alert App",
// // };

// // // ✅ Admin email for internal alerts
// // export const adminEmail = process.env.ADMIN_EMAIL || process.env.BREVO_USER;

// // // ✅ Verify connection
// // transporter.verify((error, success) => {
// //   if (error) {
// //     console.error("❌ Error connecting to Brevo SMTP:", error.message);
// //   } else {
// //     console.log("✅ Brevo SMTP server is ready to send messages");
// //   }
// // });


import dotenv from "dotenv";
import Brevo from "sib-api-v3-sdk";

dotenv.config();

// Initialize Brevo API client
const client = Brevo.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

export const brevoClient = new Brevo.TransactionalEmailsApi();

export const sender = {
  email: process.env.SENDER_EMAIL,
  name: process.env.SENDER_NAME,
};

export const adminEmail = process.env.ADMIN_EMAIL;

// Optional: test Brevo connection on startup
(async () => {
  try {
    await brevoClient.getAccount();
    console.log("✅ Connected to Brevo API successfully");
  } catch (error) {
    console.error("❌ Error connecting to Brevo API:", error.message);
  }
})();
