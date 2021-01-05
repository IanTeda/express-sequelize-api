import { users as usersService, confirmEmailTokens as confirmEmailTokensService } from '../../services';
import { emailer } from '../../utils';

/** 
 * Register as a new user
 * 
 * @memberof module:controllers/authentication
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 * @returns - Returns HTTP response body
 */
const registerUser = async (request, response, next) => {
  try {

    // Set request body values
    const { firstName, lastName, email, password1, password2 } = request.body;

    // Return error if we don't have the parameters needed
    if (!email || !password1 || !password2) {
      const error = new Error('REGISTER ERROR: Request did not contain enough parameters.');
      error.statusCode = 400;
      throw error;
    }

    // Check passwords match
    if ( password1 !== password2 ) {
      const error = new Error('REGISTER ERROR: Passwords does not match.');
      error.statusCode = 400;
      throw error;
    }

    // Build user data model to create
    const newUserData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password1,
    }

     // Create new user
     const createdUser = await usersService.createOne(newUserData);

     // Check we have a created user instance
     if (!createdUser) {
      const error = new Error('REGISTER ERROR: Unable to create one new user.');
      error.statusCode = 500;
      throw error;
    }

    // UserId to create token for
    const UserId = createdUser.id;

    // Create confirm email token
    const createdConfirmEmailToken = await confirmEmailTokensService.createOne(UserId);

    // Check a confirm email token has been generated.
    if(!createdConfirmEmailToken) {
      const error = new Error('REGISTER ERROR: Unable to create email confirmation token');
      error.statusCode = 500;
      throw error;
    }

    // Recipient details
    const name = firstName;
    const emailAddress = email;
    const token = createdConfirmEmailToken.token;

    // Send email
    const emailResponse = await emailer.confirmEmail(name, emailAddress, token);

    // Check we have an email response
    if (!emailResponse) {
      const error = new Error('REGISTER ERROR: Confirmation email token could not be sent.');
      error.statusCode = 500;
      throw error;
    };
    
    // Respond with created user data
    const responseBody = response.status(201).json({
      status: 201,
      message: `REGISTER SUCCESS: User ${createdUser.id} created.`,
      data: createdUser,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { registerUser };
export default registerUser;
