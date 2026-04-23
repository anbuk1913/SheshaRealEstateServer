import { Router } from 'express';
import * as ctrl from './content.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

// Public
router.get('/',           ctrl.getAllContent);
router.get('/page/:page', ctrl.getContentByPage);
router.get('/:key',       ctrl.getContentByKey);

// Admin-protected
router.put('/:key',       protect, ctrl.upsertContent);
router.delete('/:id',     protect, ctrl.deleteContent);

export default router;
