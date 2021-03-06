import EmailTemplate from 'email-templates';
import nodemailer from 'nodemailer';
import path from 'path';
import logger from './logger.util';
import { nodemailer as config } from '../configs';

// TODO Add pug template cache at server startup

/**
 * Nodemailer transport
 * @ignore
 */
const _transport = nodemailer.createTransport(config.smtp);

/**
 * Default setup for generating emails
 * 
 * @ignore
 */
const _emailMessage = new EmailTemplate({
  message: {
    from: 'NO REPLY <no-reply@express-sequelize-api.local>',
  },
  send: true,
  transport: _transport,
});

/**
 * Send email with reset token to email address for password reset
 * 
 * @module utils/emailer
 * @param {String} name - Name of email recipient.
 * @param {String} emailAddress  - Email address of recipient.
 * @param {String} token - Token to be used for password reset.
 */
const forgotEmail = async (name, emailAddress, token) => {
  try {
    // Check we have the required parameters
    if (!name || !emailAddress || !token) {
      const error = new Error('UTILITY ERROR: Insufficient forgotEmail params provided.');
      throw error;
    }

    // Format email and send
    const emailResponse = await _emailMessage.send({
      template: path.join(__dirname, '../', 'static', 'email-templates', 'forgot-password'),
      message: {
        to: `${name} <${emailAddress}>`,
      },
      locals: {
        name: name,
        token: token,
      },
    });

    // Log email has been sent
    logger.info(`SUCCESS: Reset token email sent ${emailResponse.messageId}`);

    // If in development provide link to https://ethereal.email/ message
    if (process.env.NODE_ENV === 'development') logger.info(nodemailer.getTestMessageUrl(emailResponse));

    return emailResponse;
  } catch (error) {
    throw error;
  }
};

/**
 * Send email with confirm email token.
 * 
 * @module utils/emailer  
 * @param {String} name - Name of email recipient.
 * @param {String} emailAddress  - Email address of recipient.
 * @param {String} token - Token to be used for password reset.
 */
const confirmEmail = async (name, emailAddress, token) => {
  try {
    // Check we have the required parameters
    if (!name || !emailAddress || !token) {
      const error = new Error('UTILITY ERROR: Insufficient confirmEmail params provided.');
      throw error;
    }

    // Format email and send
    const emailResponse = await _emailMessage.send({
      template: path.join(__dirname, '../', 'static', 'email-templates', 'confirm-email'),
      message: {
        to: `${name} <${emailAddress}>`,
      },
      locals: {
        name: name,
        token: token,
      },
    });

    // Log email has been sent
    logger.info(`UTILITY SUCCESS: Confirm email token sent ${emailResponse.messageId}`);

    // If in development provide link to https://ethereal.email/ message
    if (process.env.NODE_ENV === 'development') logger.info(nodemailer.getTestMessageUrl(emailResponse));

    return emailResponse;
  } catch (error) {
    throw error;
  }
};

const emailer = { forgotEmail, confirmEmail };

export default emailer;
