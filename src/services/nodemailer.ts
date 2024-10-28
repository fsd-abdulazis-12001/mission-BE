 
import nodemailer from 'nodemailer';
import { EMAIL_HOST, EMAIL_USERNAME, EMAIL_PASSWORD } from '../secret'; // Import from your secret config

// Transporter configuration
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: 587,
  secure: true,
  auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD
  }
});


export const sendVerificationEmail = async (email: string, verificationLink: string) => {
  console.log({EMAIL_HOST, EMAIL_USERNAME, EMAIL_PASSWORD});
  const defaulMailOptions =  {
    from: '"Abdul Azis 21001" <no-reply@kulijawa.online>', 
    to: email, 
    subject: 'Email Verification', 
    text: "Email Verification",
    html: `<b>Klik Link brikut untuk melakukan verifikasi: <a href="${verificationLink}">Verify Email</a></b>`, // Email content with verification link
  }
  try {
     
    await transporter.sendMail(defaulMailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error('Failed to send verification email');
  }
};
