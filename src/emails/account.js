const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'denisolexyuk@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app , ${name}. Let me know how you get along with app.`
  })
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'denisolexyuk@gmail.com',
    subject: 'I hope that you\'ll come back',
    html: `<span>Hello</span> <b>${name}</b>, unfortunately you cancellation you account`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}