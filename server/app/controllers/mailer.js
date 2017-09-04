const nodemailer = require("nodemailer");

// Generate SMTP service account from ethereal.email
module.exports = nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.error("Failed to create a testing account. " + err.message);
    return process.exit(1);
  }

  console.log("Credentials obtained, sending message...");

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'z3il2xiijdbm6iaz@ethereal.email',
        pass: 'j2sZBtPHFvWPcgZ1m9'
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: "bar@blurdybloop.com, baz@blurdybloop.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return process.exit(1);
    }

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
});
