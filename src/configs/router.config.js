import { Router } from 'express';
import { errors as errorsController } from '../controllers';
import { things, users, resetTokens } from '../routes'

const router = Router();

router.use('/things', things);
router.use('/users', users);
router.use('/reset-tokens', resetTokens);

// Send any request that get through the routes above to notFound
router.use(errorsController.notFound);

export default router;
