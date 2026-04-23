import { Router } from 'express';
import * as ctrl from './property.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

// Public
router.get('/',           ctrl.getProperties);
router.get('/featured',   ctrl.getFeaturedProperties);
router.get('/:slug',      ctrl.getProperty);

// Admin-protected
router.post('/',          protect, ctrl.createProperty);
router.put('/:id',        protect, ctrl.updateProperty);
router.delete('/:id',     protect, ctrl.deleteProperty);

export default router;