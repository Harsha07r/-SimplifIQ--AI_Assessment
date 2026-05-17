const nodemailer = require('nodemailer');

/**
 * Sends an email with the generated PDF attached.
 * @param {string} recipientEmail - The recipient's email address.
 * @param {string} recipientName - The recipient's name.
 * @param {string} pdfPath - The file path of the PDF to attach.
 */
async function sendEmail(recipientEmail, recipientName, pdfPath) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: 'Your Personalized AI Business Audit Report',
      text: `Hello ${recipientName},

Thank you for your interest.

We analyzed your company and prepared a personalized AI-powered business audit report.

Please find the attached report.

Best Regards,
SimplifIQ Automation Team`,
      attachments: [
        {
          filename: 'Business-Audit-Report.pdf',
          path: pdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to', recipientEmail);
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Failed to send email.');
  }
}

module.exports = { sendEmail };