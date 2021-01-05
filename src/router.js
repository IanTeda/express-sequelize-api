import { Router } from 'express';
import { resources } from './configs';
import { authorization as authorizationMiddleware, notFound as notFoundMiddleware } from './middleware';
import { confirmEmailTokens as confirmEmailTokensRoutes, resetTokens as resetTokensRoutes, roots as rootsRoutes, things as thingsRoutes, users as usersRoutes, authorizations as authorizationsRoutes } from './routes';

const router = Router();

router.use(resources.ROOTS, rootsRoutes);
router.use(resources.THINGS, authorizationMiddleware, thingsRoutes);
router.use(resources.USERS, authorizationMiddleware, usersRoutes);
router.use(resources.RESET_TOKENS, authorizationMiddleware, resetTokensRoutes);
router.use(resources.CONFIRM_EMAIL_TOKENS, authorizationMiddleware, confirmEmailTokensRoutes);
router.use(resources.AUTHORIZATIONS, authorizationMiddleware, authorizationsRoutes);

// Send any request that get through the routes above to notFound
router.use(notFoundMiddleware);

export default router;
