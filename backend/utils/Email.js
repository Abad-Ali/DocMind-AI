import { transporter } from "./Email.config.js";
import { AI_Summary_AND_QA_Email_Template, Verification_Email_Template, Welcome_Email_Template } from "./EmailTemplate.js";

export const sendVerificationEmail = async(email,verificationCode)=>{
    try {
     const response = await transporter.sendMail({
            from: '"DocMind AI" <no-reply@yourdomain.com>',

            to: email, // list of receivers
            subject: "Verify your Email", // Subject line
            text: "Verify your Email", // plain text body
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode)
        })
        // console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}

export const sendWelcomeEmail=async(email,name)=>{
    try {
     const response=   await transporter.sendMail({
            from: '"DocMind AI" <no-reply@yourdomain.com>',

            to: email, // list of receivers
            subject: "Welcome Email", // Subject line
            text: "Welcome Email", // plain text body
            html: Welcome_Email_Template.replace("{name}",name)
        })
        // console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}


export const sendAISummaryandQAEmail = async (email, userName, pdfTitle, summary, questions) => {
  try {
    const htmlContent = AI_Summary_AND_QA_Email_Template({ userName, pdfTitle, summary, questions });

    const response = await transporter.sendMail({
      from: '"DocMind AI" <no-reply@yourdomain.com>', // sender
      to: email, // recipient
      subject: `AI Summary & Questions for "${pdfTitle}"`, // dynamic subject
      text: `Hello ${userName}, your AI summary and questions for "${pdfTitle}" are ready.`, // fallback plain text
      html: htmlContent, // HTML content
    });

    console.log('Email sent successfully:', response.messageId);
  } catch (error) {
    console.error('Error sending AI summary email:', error);
  }
};