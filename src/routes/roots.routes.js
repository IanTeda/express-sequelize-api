import { Router } from 'express';
import { roots, authentication } from '../controllers';

let router = Router();

router.get('/', roots.home);

router.post('/login', authentication.login);
router.post('/forgot', authentication.forgotPassword);
router.post('/reset', authentication.resetPassword);
router.post('/register', authentication.registerUser)
router.post('/confirm', authentication.confirmEmail)

export default router;
