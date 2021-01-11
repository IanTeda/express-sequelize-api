import passport from 'passport';
import { accessControl as grantsList } from '../configs';
import { AccessControl } from 'accesscontrol';

/**
 * Module for manage user access throughout the api
 *
 * @module middleware/authorization
 * @param {Object} request      HTTP Request object
 * @param {Object} response     HTTP Response object
 * @param {Object} next         Next middleware callback
 */
const authorization = (request, response, next) => {

  passport.authenticate('jwt', async (error, user, info) => {

    try {
      if (error || !user) {
        const error = new Error(`AUTHORIZATION ERROR: ${info.message}.`);
        error.statusCode = 401;
        throw error;
      }

      // Custom callback so we can add user to the request object and customise the error message
      request.login(user, { session: false }, async (error) => {
        if (error) throw error;

        return next();
      });
    } catch (error) {
      return next(error);
    }
  })(request, response, next);
};

export { authorization };
export default authorization;

// https://stackoverflow.com/questions/38893178/what-is-the-best-way-to-implement-roles-and-permission-in-express-rest-api
