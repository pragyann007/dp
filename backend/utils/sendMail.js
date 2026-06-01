import dotenv from "dotenv";
import { sendEmail } from "../utils/email.js";

dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);






export const sendPaymentMail = async( to,
  courseName,
  price,
  isPaid,
  appName = "Durbar Physics")=>{
    try {
      await sendEmail({
        to,
        subject: `${appName} : Payment Confirmation`,
        html: `
        <div style="font-family: Arial, sans-serif; padding:20px; border:1px solid #eee; border-radius:8px; max-width:600px; margin:auto;">
          <h2 style="color:orange;">${appName} - Payment Confirmation</h2>
          <p>Hi,</p>
          <p>Thank you for your interest in <b>${courseName}</b>.</p>
          
          <table style="width:100%; border-collapse:collapse; margin:20px 0;">
            <tr>
              <td style="padding:8px; border:1px solid #ddd;"><b>Course</b></td>
              <td style="padding:8px; border:1px solid #ddd;">${courseName}</td>
            </tr>
            <tr>
              <td style="padding:8px; border:1px solid #ddd;"><b>Price</b></td>
              <td style="padding:8px; border:1px solid #ddd;">NPR ${price}</td>
            </tr>
            <tr>
              <td style="padding:8px; border:1px solid #ddd;"><b>Status</b></td>
              <td style="padding:8px; border:1px solid #ddd;">${statusText}</td>
            </tr>
          </table>

          <p>If you have any questions, feel free to reply to this email.</p>
          <p style="margin-top:20px;">Regards,<br><b>${appName} Team</b></p>
          <a href="http://localhost:5173/my-payments" 
            style="display:inline-block; margin-top:20px; padding:10px 20px; background-color:orange; color:white; text-decoration:none; border-radius:6px;">
            See update on website
          </a>
        </div>
      `,
      });
      
    } catch (error) {
      console.log("error sending payment mail", error);
      
    }
  }

export const sendVerifyMailOtp = async (
  to,
  otp,
  appName = "Durbar Physics"
) => {
  try {
  

    const info = await sendEmail({
      to,
      subject: `${appName} : Verify OTP for registration`,
      html : `
      <div style="font-family: Arial, sans-serif; background-color: #fff8f0; padding: 40px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <div style="background-color: #ff6f00; color: white; text-align: center; padding: 30px;">
            <h1 style="margin: 0;">${appName}</h1>
          </div>

          <div style="padding: 30px;">
            <p>Hello,</p>
            <p>Thank you for registering with <strong>${appName}</strong>.</p>

            <div style="text-align:center; margin:30px 0;">
              <span style="font-size:28px; font-weight:bold; color:#ff6f00;">
                ${otp}
              </span>
            </div>

            <p>This OTP is valid for the next 10 minutes.</p>

            <p>
              Cheers,<br/>
              ${appName} Team
            </p>
          </div>
        </div>
      </div>
    `
    });

    console.log(info);

    console.log("✅ OTP email sent successfully to", to);
  } catch (error) {
    console.error("❌ Error sending OTP mail:", error);
  }
};


export const sendMeetLink = async (
  to,
  courseTitle,
  meetlink,
  courseName,
  day,
  appName = "Durbar Physics"
) => {
  try {
    await sendEmail({
      to,
      subject: `${appName} | Google Meet Link for ${courseName} - Day ${day}`,
      html: `
      <div style="font-family: 'Arial', sans-serif; background-color:#fffaf0; padding:20px;">
        <div style="max-width:600px; margin:auto; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1); border:1px solid #ffa500;">
          <div style="background-color:#ff7700; color:white; padding:20px; text-align:center;">
            <h1 style="margin:0; font-size:24px;">${appName}</h1>
          </div>

          <div style="padding:20px; color:#333;">
            <h2 style="color:#ff7700; font-size:20px; margin-bottom:10px;">Hello, Student!</h2>
            <p style="font-size:16px; line-height:1.5;">
              You have a scheduled session for the <strong>${courseName}</strong> course (Day ${day}) via Google Meet.
            </p>
            <p style="font-size:16px; line-height:1.5;">
              Course Topic: <strong>${courseTitle}</strong>
            </p>

            <div style="text-align:center; margin:30px 0;">
              <a href="${meetlink}" target="_blank" 
                style="background-color:#ff7700; color:white; text-decoration:none; padding:12px 25px; border-radius:6px; font-weight:bold; font-size:16px; display:inline-block;">
                Join Meet
              </a>
            </div>

            <p style="font-size:14px; color:#555; text-align:center; margin-top:20px;">
              Note: Please join 5 minutes before the scheduled time and keep your microphone muted unless asked otherwise.
            </p>
            <p style="font-size:14px; color:#555; text-align:center;">- ${appName} Team</p>
          </div>

          <div style="background-color:#fff5e6; padding:15px; text-align:center; color:#ff7700; font-size:12px;">
            This is an automated email. Please do not reply.
          </div>
        </div>
      </div>
    `,
    });
  

    console.log("✅ Meet link sent to", to);
  } catch (error) {
    console.error("❌ Error sending meet link:", error);
  }
};

export const sendVideoNotification = async (
  to,
  videoTitle,
  courseTitle,
  appName = "Durbar Physics"
) => {
  try {


    await sendEmail({
      to,
      subject: `${appName} - New Video Added: ${videoTitle}`,
      html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="background-color: #FF8C42; padding: 20px; border-radius: 10px; text-align: center;">
          <h2 style="color: white; margin-bottom: 10px;">📹 New Video Alert!</h2>
          <p style="color: white; font-size: 16px;">A new video titled <strong>${videoTitle}</strong> has been added to your course <strong>${courseTitle}</strong>.</p>
        </div>
        <div style="padding: 20px;">
          <p>Hi there,</p>
          <p>We have just uploaded a new video for your learning. Check your <strong>learning portal</strong> to watch it and continue your progress.</p>
          <p style="margin-top: 20px;">
            <a href="#" style="display: inline-block; background-color: #FF8C42; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px;">Go to Portal</a>
          </p>
          <p style="margin-top: 30px; font-size: 12px; color: #888;">This is an automated notification from ${appName}. Please do not reply to this email.</p>
        </div>
      </div>
    `,    });

    console.log("✅ Video notification sent to", to);
  } catch (error) {
    console.error("❌ Error sending video notification:", error.message);
  }
};