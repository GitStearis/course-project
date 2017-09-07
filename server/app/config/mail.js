module.exports.transport = {
  //host: "smtp.ethereal.email",
  //port: 587,
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

module.exports.verificationRand = () => {
  return rand = Math.floor(Math.random() * 100 + 54);
}

module.exports.verificationMail = (email, rand, req) => {
  // let link = "hhtp://" + req.get("host") + "/verify?id=" + rand;
  return config = {
    from: '"Margarita, George" <itra.courseproject@gmail.com>',
    to: email,
    subject: "Account Verification",
    text: "Hello! Welcome to our awesome web-app!",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      "http://" + req.get("host") + "/api/verify?id=" + rand +
      ">Click here to verify</a>"
  };
  // return config;
};

module.exports.successRegistration = email => {
  let config = {
    from: '"Margarita, George" <itra.courseproject@gmail.com>', // sender address
    to: email,
    subject: "Succesful registration ✔",
    text: "Hello! Welcome to our awesome web-app!",
    html:
      "Hello! Welcome to our awesome web-app!"
  };
  return config;
}

module.exports.sendMail = (err, info) => {
  if (err) {
    console.log("Error occurred. " + err.message);
    return process.exit(1);
  }
  console.log("Message sent: %s", info.messageId);
};
