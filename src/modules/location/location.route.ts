import { Router } from 'express';
import * as ctrl from './location.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/',     ctrl.getLocations);
router.get('/:id',  ctrl.getLocation);
router.post('/',    protect, ctrl.createLocation);
router.put('/:id',  protect, ctrl.updateLocation);
router.delete('/:id', protect, ctrl.deleteLocation);

export default router;