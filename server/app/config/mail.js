module.exports.transport = {
    //host: "smtp.ethereal.email",
    //port: 587,
    service: 'gmail',
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      // user: "z3il2xiijdbm6iaz@ethereal.email",
      // pass: "j2sZBtPHFvWPcgZ1m9"
      user: 'itra.courseproject@gmail.com',
      pass: 'itransition1'
    },
    tls: {
      rejectUnauthorized: false
    }
}

module.exports.mailOptions = (email) =>{
    let config = {
        from: '"Margarita, George" <itra.courseproject@gmail.com>', // sender address
        // to: ["<itra.courseproject@gmail.com>", "<snowqueen@mailinator.com>"],
        to: email,
        subject: "Succesful registration ✔",
        text: "Hello! Welcome to our awesome web-app!",
        html: "<b>Hello world!</b>"
    };
    return config;
}

module.exports.sendMail = (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return process.exit(1);
    }
    console.log("Message sent: %s", info.messageId);
  }