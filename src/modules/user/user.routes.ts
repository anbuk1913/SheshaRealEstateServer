import { Router } from 'express';
import * as ctrl from './user.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/login',    ctrl.login);
router.post('/register', ctrl.register);
router.get('/profile',   protect, ctrl.getProfile);

export default router;
