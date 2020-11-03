import { resetToken as resetTokenService, users as usersService } from '../../services';
import { emailer, logger } from '../../utils';

const forgotPassword = async (req, res, next) => {
  try {

    // Check we have a request body
    if (!req.body) {
      throw new Error('AUTHENTICATION ERROR: Forgot request body is empty.');
    }

    // Parse request body
    const { email } = req.body;

    // Check we have an email
    if (!email) {
      throw new Error('AUTHENTICATION ERROR: Forgot request has no email.');
    }

    // Check email exists
    let user = await usersService.findOneByEmail(email);

    // Update used all reset tokens for given email
    // TODO update updateTokensUsedByEmail function
    await resetTokenService.updateTokensUsedByEmail(email);

    // Get reset token
    const token = await resetTokenService.createOne(email);

    // Check we have a token
    if (!token) {
      throw new Error('AUTHENTICATION ERROR: Forgot reset token not generated.');
    }

    // Recipient details
    const name = user.name;
    const emailAddress = email;

    // Send email
    const emailResponse = await emailer.forgotEmail(name, emailAddress, token);

    // Check we have an email response
    if (!emailResponse) {
      throw new Error('AUTHENTICATION ERROR: Forgot reset email could not be sent.');
    }

    // API response
    let response = res.status(200).json({
      status: 200,
      message: `SUCCESS: Reset token sent to <${email}>.`,
    });

    return response;
  } catch (err) {

    // Log error message since we are not passing them on
    logger.error(err.message);

    // Send consistent error message to limit attack vectors
    let response = res.status(500).json({
      status: 500,
      message: `FORGOT PASSWORD ERROR: Reset token was not sent.`,
    });

    return response;
  }
};

export default forgotPassword;