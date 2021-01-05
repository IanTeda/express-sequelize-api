import { ExtractJwt as ExtractJWT, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { users as usersService } from '../services';
import { logger } from '../utils';
import jwtConfig from './jwt.config';

/**
 * Local strategy options
 * @ignore
 */
const _localOptions = {
  // passport uses 'username' by default, we are going to use email so change it
  usernameField: 'email',
  passwordField: 'password',
};

/**
 * JSON Web Token Options
 * @ignore
 */
const _jwtOptions = {
  // The secret we used to sign our JWT
  secretOrKey: jwtConfig.secret,

  // We are expecting the user to send the token as a bearer token
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

/**
 * Local strategy used to check supplied email and password against database.
 */
const local = new LocalStrategy(_localOptions, async (email, password, done) => {
  try {
    // Find user and create instance, service will throw error on unknown email
    // Will throw error to catch block when no email found
    let user = await usersService.findOneByEmail(email);

    // Check password is valid for found user. Will return false
    let isPasswordValid = await user.authenticate(password);

    // if invalid return user false
    if (!isPasswordValid) throw new Error(`AUTHENTICATION ERROR: Incorrect password provided for ${user.email}.`);

    // Check if user is active
    let isActive = await user.isActive();

    if (!isActive) throw new Error(`AUTHENTICATION ERROR: User ${user.email} is not active.`);

    // If we get through the checks return user instance
    return done(null, user, {
      message: 'AUTHENTICATION SUCCESS: Log in successful.',
    });
  } catch (error) {
    let message = error.message;
    // Return the passport error style with false user
    return done(null, false, {
      message: message,
    });
  }
});

/**
 * JWT strategy verifies that the token sent by the user is valid.
 */
const jwt = new JwtStrategy(_jwtOptions, async (payload, done) => {
  try {
    // Get user.id from the JWT payload
    const id = payload.id;

    // Find user in the database
    const user = await usersService.findOneByPk(id);

    // Pass the user instance to the middleware
    return done(null, user);
  } catch (error) {
    // Get the error message
    let message = error.message;

    // Strip out before ':' and add 'AUTHENTICATION ERROR:'
    message = 'AUTHENTICATION ERROR:' + message.split(':').pop();

    // Return the passport error style with false user
    return done(null, false, {
      message: message,
    });
  }
});

const strategies = { local, jwt };

export default strategies;
