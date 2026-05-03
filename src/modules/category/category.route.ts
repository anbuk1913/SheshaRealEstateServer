    import { Router } from 'express';
import * as ctrl from './category.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/',     ctrl.getCategories);
router.get('/:id',  ctrl.getCategory);
router.post('/',    protect, ctrl.createCategory);
router.put('/:id',  protect, ctrl.updateCategory);
router.delete('/:id', protect, ctrl.deleteCategory);

export default router;