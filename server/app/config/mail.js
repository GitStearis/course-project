const crypto = require("crypto");

module.exports.transport = {
  service: "gmail",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    // user: "z3il2xiijdbm6iaz@ethereal.email",
    // pass: "j2sZBtPHFvWPcgZ1m9"
    user: "itra.courseproject@gmail.com",
    pass: "itransition1"
  },

};

module.exports.verificationToken = () => {
  return crypto.randomBytes(16).toString("hex");
}

module.exports.verificationMail = (email, verificationToken, req) => {
  return config = {
    from: '"Margarita, George" <itra.courseproject@gmail.com>',
    to: email,
    subject: "Account Verification",
    text: "Hello! Welcome to our awesome web-app!",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      "http://" + req.get("host") + "/verify/" + verificationToken +
      ">Click here to verify</a>"
  };
};

function newsMail (email, subject, msg) {
  let config = {
    from: '"CO-OP Team" <itra.courseproject@gmail.com>', // sender address
    to: email,
    subject: subject,
    text: "Hello! Welcome to our awesome web-app!",
    html: msg
  };
  return config;
}

module.exports.sendMail = (err, info) => {
  if (err) {
    console.log(`Error occurred. ${err.message}`);
    return process.exit(1);
  }
  console.log(`Message sent: ${info.messageId}`);
};

module.exports.newsMailToFollowers = (news, followers) => {
  let subject = `Check news on CO-OP ✔`;
  let message = 
    `Hello! You're following <a href='http://localhost:4200/project/${news.pageId}'>project</a> on CO-OP. 
    Check the latest new via this <a href='http://localhost:4200/news/${news.newsId}'>link</a>`;
  let mailOptions = newsMail(followers, subject, message);
  return mailOptions;
}