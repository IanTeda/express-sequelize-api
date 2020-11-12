// Switch case for smtp configuration
let host, user, pass;
switch (process.env.NODE_ENV) {
  case 'production':
    host = process.env.SMTP_HOST;
    user = process.env.SMTP_USER;
    pass = process.env.SMTP_PASSWORD;
    break;
  default:
    host = 'smtp.ethereal.email';
    user = process.env.ETHEREAL_USER;
    pass = process.env.ETHEREAL_PASSWORD;
    break;
}

/**
 * Nodemailer transport configurations
 *
 * @module configs/nodemailer
 * @returns - Returns nodemailer configuration objects
 */
const transportConfigs = {
  ethereal: {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASSWORD,
    },
  },
  iinet: {
    host: 'mail.iinet.net.au',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  smtp: {
    host: host,
    port: 587,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
  },
};

export default transportConfigs;
