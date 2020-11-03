import { resetTokens as resetTokensController } from '../controllers';
import { Router } from 'express';

const router = Router();

/**
 * @api {post} /reset-tokens/:id Request create Thing.
 * @apiName createOne
 * @apiGroup ResetTokens
 *
 * @apiParam {Int} id - ResetTokens primary key ID.
 *
 * @apiSuccess {Int} id - Reset token primary key id.
 * @apiSuccess {Int} UserId - Foreign key of user associated to reset token.
 * @apiSuccess {String} token - JSON Web Token for user password reset.
 * @apiSuccess {Date} expiration - The date the reset token will expire.
 * @apiSuccess {Boolean} isUsed - Has the reset token already been used.
 */
router.post('/', resetTokensController.createOne);

/**
 * @api {get} /reset-tokens Request read all things.
 * @apiName readAll
 * @apiGroup ResetTokens
 *
 * @apiSuccess {Int} id - Reset token primary key id.
 * @apiSuccess {Int} UserId - Foreign key of user associated to reset token.
 * @apiSuccess {String} token - JSON Web Token for user password reset.
 * @apiSuccess {Date} expiration - The date the reset token will expire.
 * @apiSuccess {Boolean} isUsed - Has the reset token already been used.
 */
router.get('/', resetTokensController.readAll);

/**
 * @api {get} /reset-tokens/:id Request Thing information
 * @apiName readOne
 * @apiGroup ResetTokens
 *
 * @apiParam {Int} id - ResetTokens primary key ID.
 *
 * @apiSuccess {Int} id - Reset token primary key id.
 * @apiSuccess {Int} UserId - Foreign key of user associated to reset token.
 * @apiSuccess {String} token - JSON Web Token for user password reset.
 * @apiSuccess {Date} expiration - The date the reset token will expire.
 * @apiSuccess {Boolean} isUsed - Has the reset token already been used.
 */
router.get('/:id', resetTokensController.readOne);

/**
 * @api {put} /reset-tokens/:id Request Thing update.
 * @apiName updateOne
 * @apiGroup ResetTokens
 *
 * @apiParam {Int} id - ResetTokens primary key ID.
 *
 * @apiSuccess {Int} id - Reset token primary key id.
 * @apiSuccess {Int} UserId - Foreign key of user associated to reset token.
 * @apiSuccess {String} token - JSON Web Token for user password reset.
 * @apiSuccess {Date} expiration - The date the reset token will expire.
 * @apiSuccess {Boolean} isUsed - Has the reset token already been used.
 */
router.put('/:id', resetTokensController.updateOne);

/**
 * @api {delete} /reset-tokens Request delete Thing.
 * @apiName destroyOne
 * @apiGroup ResetTokens
 *
 * @apiSuccess {Int} count - A count of the reset tokens destroyed.
 */
router.delete('/', resetTokensController.destroyExpired);

/**
 * @api {delete} /reset-tokens/:id Request delete Thing.
 * @apiName destroyOne
 * @apiGroup ResetTokens
 *
 * @apiParam {Int} id - ResetTokens primary key ID.
 *
 * @apiSuccess {Int} count - A count of the reset tokens destroyed.
 */
router.delete('/:id', resetTokensController.destroyOne);

export default router;
