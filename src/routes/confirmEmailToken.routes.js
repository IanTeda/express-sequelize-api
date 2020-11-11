import { confirmEmailTokens as confirmEmailTokensController } from '../controllers';
import { Router } from 'express';

const router = Router();

/**
 * @api {post} /confirm-email-tokens  Create a new token for confirming an email address.
 * @apiName createOne
 * @apiGroup ConfirmEmailTokens
 *
 * @apiSuccess {Int} id           ConfirmEmailToken primary key id.
 * @apiSuccess {Int} UserId       Foreign key of user associated to token.
 * @apiSuccess {String} token     Token to use for confirming users email address.
 * @apiSuccess {Date} expiration  The expiration date for the confirm email token.
 */
router.post('/', confirmEmailTokensController.createOne);

/**
 * @api {get} /confirm-email-tokens   Request all confirm email tokens.
 * @apiName readAll
 * @apiGroup ConfirmEmailTokens
 * 
 *  @apiParam {Int} [limit]         Optional limit to query. Will default to 10.
 *  @apiParam {Int} [offset]        Optional pagination offset based on limit. Will default to 0
 *  @apiParam {String} [where]      Optional query filter.
 *
 * // TODO: This isn't right
 * @apiSuccess {Int} id             ConfirmEmailToken primary key id.
 * @apiSuccess {Int} UserId         Foreign key of user associated to token.
 * @apiSuccess {String} token       Token to use for confirming users email address.
 * @apiSuccess {Date} expiration    The expiration date for the confirm email token.
 */
router.get('/', confirmEmailTokensController.readAll);

/**
 * @api {get} /confirm-email-tokens/:id   Request a specific confirm email token with a primary key id.
 * @apiName readOne
 * @apiGroup ConfirmEmailTokens
 *
 * @apiParam {Int} id               ConfirmEmailToken primary key ID.
 *
 * @apiSuccess {Int} id             ConfirmEmailToken primary key id.
 * @apiSuccess {Int} UserId         Foreign key of user associated to token.
 * @apiSuccess {String} token       Token to use for confirming users email address.
 * @apiSuccess {Date} expiration    The expiration date for the confirm email token.
 */
router.get('/:id', confirmEmailTokensController.readOne);

/**
 * @api {put} /confirm-email-tokens/:id Update confirm email token with a primary key id.
 * @apiName updateOne
 * @apiGroup ConfirmEmailTokens
 *
 * @apiParam {Int} id             ConfirmEmailToken primary key ID.
 *
 * @apiSuccess {Int} id           ConfirmEmailToken primary key id.
 * @apiSuccess {Int} UserId       Foreign key of user associated to token.
 * @apiSuccess {String} token     Token to use for confirming users email address.
 * @apiSuccess {Date} expiration  The expiration date for the confirm email token.
 */
router.put('/:id', confirmEmailTokensController.updateOne);

/**
 * @api {delete} /confirm-email-tokens    Delete all expired confirm email tokens.
 * @apiName destroyOne
 * @apiGroup ConfirmEmailTokens
 *
 * @apiSuccess {Int} count      A count of the confirm email tokens destroyed.
 */
router.delete('/', confirmEmailTokensController.destroyExpired);

/**
 * @api {delete} /confirm-email-tokens/:id    Destroy confirm email token for a given primary key id.
 * @apiName destroyOne
 * @apiGroup ConfirmEmailTokens
 *
 * @apiParam {Int} id           ConfirmEmailToken primary key ID.
 *
 * @apiSuccess {Int} count      A count of the confirm email tokens destroyed.
 */
router.delete('/:id', confirmEmailTokensController.destroyOne);

export default router;
