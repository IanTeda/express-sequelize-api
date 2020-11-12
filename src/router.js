import { Router } from 'express';
import passport from 'passport';
import { jwt as tokenConfig } from './configs';
import { errors as errorsController } from './controllers';
import { confirmEmailTokens, resetTokens, roots, things, users } from './routes';

const router = Router();

router.use('/', roots);
router.use('/things', passport.authenticate('jwt', tokenConfig.session), things);
router.use('/users', passport.authenticate('jwt', tokenConfig.session), users);
router.use('/reset-tokens', passport.authenticate('jwt', tokenConfig.session), resetTokens);
router.use('/confirm-email-tokens', confirmEmailTokens);

// Send any request that get through the routes above to notFound
router.use(errorsController.notFound);

export default router;
