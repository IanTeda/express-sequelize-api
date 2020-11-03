import { Router } from 'express';
import { roots, authentication } from '../controllers';

let router = Router();

router.get('/', roots.index);

router.post('/login', authentication.login);
router.post('/register', authentication.register);
router.post('/forgot', authentication.forgot);
router.post('/reset-password', authentication.resetPassword);
router.post('/register', authentication.register);

router.get('/logout', authentication.logout);

export default router;
