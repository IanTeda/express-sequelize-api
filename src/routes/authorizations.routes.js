import { authorizations as authorizationsController } from '../controllers';
import { Router } from 'express';

const router = Router();

/**
 * @api {post} /authorizations    Create a new authorization.
 * @apiName createOne
 * @apiGroup Authorizations
 *
 * @apiSuccess {Int} id               Authorization primary key id.
 * @apiSuccess {String} role          User role/group.
 * @apiSuccess {Int} userId           Allow/Deny a specific user, any user or own.
 * @apiSuccess {String} resource      Resource/endpoint associated with authorization.
 * @apiSuccess {Int} resourceId       All, own or specific resource.
 * @apiSuccess {String} permission    Create, read, update, destroy or deny.
 */
router.post('/', authorizationsController.createOne);

/**
 * @api {get} /authorizations   Request all confirm email tokens.
 * @apiName readAll
 * @apiGroup Authorizations
 * 
 *  @apiParam {Int} [limit]         Optional limit to query. Will default to 10.
 *  @apiParam {Int} [offset]        Optional pagination offset based on limit. Will default to 0
 *  @apiParam {String} [where]      Optional query filter.
 *
 * // TODO: This isn't right
 * @apiSuccess {Int} id               Authorization primary key id.
 * @apiSuccess {String} role          User role/group.
 * @apiSuccess {Int} userId           Allow/Deny a specific user, any user or own.
 * @apiSuccess {String} resource      Resource/endpoint associated with authorization.
 * @apiSuccess {Int} resourceId       All, own or specific resource.
 * @apiSuccess {String} permission    Create, read, update, destroy or deny.
 */
router.get('/', authorizationsController.readAll);

/**
 * @api {get} /authorizations/:id   Request a specific confirm email token with a primary key id.
 * @apiName readOne
 * @apiGroup Authorizations
 *
 * @apiParam {Int} id               ConfirmEmailToken primary key ID.
 *
 * @apiSuccess {Int} id               Authorization primary key id.
 * @apiSuccess {String} role          User role/group.
 * @apiSuccess {Int} userId           Allow/Deny a specific user, any user or own.
 * @apiSuccess {String} resource      Resource/endpoint associated with authorization.
 * @apiSuccess {Int} resourceId       All, own or specific resource.
 * @apiSuccess {String} permission    Create, read, update, destroy or deny.
 */
router.get('/:id', authorizationsController.readOne);

/**
 * @api {put} /authorizations/:id Update confirm email token with a primary key id.
 * @apiName updateOne
 * @apiGroup Authorizations
 *
 * @apiParam {Int} id             ConfirmEmailToken primary key ID.
 *
 * @apiSuccess {Int} id               Authorization primary key id.
 * @apiSuccess {String} role          User role/group.
 * @apiSuccess {Int} userId           Allow/Deny a specific user, any user or own.
 * @apiSuccess {String} resource      Resource/endpoint associated with authorization.
 * @apiSuccess {Int} resourceId       All, own or specific resource.
 * @apiSuccess {String} permission    Create, read, update, destroy or deny.
 */
router.put('/:id', authorizationsController.updateOne);

/**
 * @api {delete} /authorizations    Delete all expired confirm email tokens.
 * @apiName destroyOne
 * @apiGroup Authorizations
 *
 * @apiSuccess {Int} count      A count of the confirm email tokens destroyed.
 */
router.delete('/', authorizationsController.destroyAll);

/**
 * @api {delete} /authorizations/:id    Destroy confirm email token for a given primary key id.
 * @apiName destroyOne
 * @apiGroup Authorizations
 *
 * @apiParam {Int} id           ConfirmEmailToken primary key ID.
 *
 * @apiSuccess {Int} count      A count of the confirm email tokens destroyed.
 */
router.delete('/:id', authorizationsController.destroyOne);

export default router;
