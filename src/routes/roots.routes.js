import { Router } from 'express';
import { roots, authentications as authenticationsController } from '../controllers';
import { authenticate } from '../middleware'

let router = Router();

/**
 * @api {get} / API       Home endpoint
 * @apiVersion 0.1.0
 * @apiName home
 * @apiGroup Home
 */
router.get('/', roots.home);

/**
 * @api {post} /login      User login to retrieve JWT
 * @apiVersion 0.1.0
 * @apiName login
 * @apiGroup Authentication
 *
 * @apiSuccess {String} message   Primary key of the created thing.
 * @apiSuccess {String} token     JSON Web Token for authentication.
 */
router.post('/login', authenticate, authenticationsController.login);

/**
 * @api {post} /forgot      Request password reset email with token
 * @apiVersion 0.1.0
 * @apiName forgotPassword
 * @apiGroup Authentication
 *
 * @apiParam {String} email   Email address of user password to reset.
 *
 * @apiSuccess {String} message   Confirm email has been sent.
 */
router.post('/forgot', authenticationsController.forgotPassword);

/**
 * @api {post} /reset      Reset user password
 * @apiVersion 0.1.0
 * @apiName forgotPassword
 * @apiGroup Authentication
 *
 * @apiParam {String} email   Email address of user password to reset.
 *
 * @apiSuccess {String} message   Confirm email has been sent.
 */
router.post('/reset', authenticationsController.resetPassword);

/**
 * @api {post} /register      Register a new user
 * @apiVersion 0.1.0
 * @apiName registerUser
 * @apiGroup Authentication
 *
 * @apiParam {String} firstName   User first name.
 * @apiParam {String} lastName    User last name.
 * @apiParam {String} email       User email address.
 * @apiParam {String} password    Plain text user password.
 *
 * @apiSuccess {Object} user              User JSON array.
 * @apiSuccess {Number} user.id           Primary key id for user.
 * @apiSuccess {String} user.firstName    User first name.
 * @apiSuccess {String} user.lastName     User last name.
 * @apiSuccess {String} user.email        User email address.
 */
router.post('/register', authenticationsController.registerUser);

/**
 * @api {post} /confirm      Confirm user email address
 * @apiVersion 0.1.0
 * @apiName confirmEmail
 * @apiGroup Authentication
 *
 * @apiParam {String} token       Token emailed to user.
 *
 * @apiSuccess {String} message   Email address confirmed.
 */
router.post('/confirm', authenticationsController.confirmEmail);

export default router;
