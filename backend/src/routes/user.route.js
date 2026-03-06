import {Router} from 'express';
import { UserController} from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.put('/location', authenticate, UserController.updateLocation);
router.get('/active', authenticate, UserController.getActiveUsers);

export default router;
