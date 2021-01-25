const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'jayeshukalkar@gmail.com', // Change to your recipient
  from: 'noreply@khamang.com', // Change to your verified sender
  subject: 'Email Verification from Khamang',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

exports.SendEmail = (options) => {
  sgMail
    .send(msg)
    .then(() => {
      console.log('EMAIL SENT');
    })
    .catch((error) => {
      console.error(error);
    });
};
