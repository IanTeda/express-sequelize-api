import { Router } from 'express';
import { roots, authentication } from '../controllers';

let router = Router();

router.get('/', roots.home);

router.post('/login', authentication.login);
router.post('/forgot-password', authentication.forgotPassword);
router.post('/reset-password', authentication.resetPassword);

export default router;
