import { Router } from 'express';
import * as ctrl from './property.controller';
import { protect } from '../../middlewares/auth.middleware';
import { createUploader } from '../../utils/upload';

const router = Router();
const upload = createUploader('properties', { maxSizeMB: 10 });

router.get('/',         ctrl.getProperties);
router.get('/featured', ctrl.getFeaturedProperties);
router.get('/:slug',    ctrl.getProperty);

// Admin-protected
router.post('/',   protect, upload.array('images', 10), ctrl.createProperty);
router.put('/:id', protect, upload.array('images', 10), ctrl.updateProperty);
router.delete('/:id', protect, ctrl.deleteProperty);

export default router;