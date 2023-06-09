const sendAnEmail = (message) => {

    const nodemailer = require('nodemailer');
    const sgTransport = require('nodemailer-sendgrid-transport');
    const options = {
      auth: {
        api_user: 'sendgrid_USER',
        api_key: 'sendgrid_APIKEY'
      }
    }
    const client = nodemailer.createTransport(sgTransport(options));
  
    const email = {
      from: 'Teshop',
      to: 'kleric13@seznam.cz',
      subject: 'Report',
      text: message,
      html: '<b>Hello world</b>'
    };
    client.sendMail(email, function(err, info) {
      return err? err.message : 'Message sent: ' + info.response;
    });
  }
  
  module.exports = (on, config) => {
    on('task', {
      sendMail (message) {
        return sendAnEmail(message);
      }
    })
  }