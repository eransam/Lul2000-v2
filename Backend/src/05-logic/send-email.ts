import nodemailer from "nodemailer";

async function sendEmailWithAttachment(to: string, attachmentPath: string) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "eransam21@gmail.com", // your email address
      pass: "erueushk28Ee", // your email password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "eransam21@gmail.com", // sender address
    to: to, // list of receivers
    subject: "Excel file attachment", // Subject line
    text: "Please find attached the Excel file you requested.", // plain text body
    attachments: [
      {
        filename: "data.xlsx",
        path: attachmentPath, // path to the Excel file on your computer
      },
    ],
  });

  console.log("Message sent: %s", info.messageId);
}

export { sendEmailWithAttachment };
