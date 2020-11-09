import { Router } from 'express';
import passport from 'passport';
import { errors as errorsController } from '../controllers';
import { resetTokens, roots, things, users } from '../routes';
import tokenConfig from './jwt.config';

const router = Router();

router.use('/', roots);
router.use('/things', passport.authenticate('jwt', tokenConfig.session), things);
router.use('/users', passport.authenticate('jwt', tokenConfig.session), users);
router.use('/reset-tokens', passport.authenticate('jwt', tokenConfig.session), resetTokens);

// Send any request that get through the routes above to notFound
router.use(errorsController.notFound);

export default router;
