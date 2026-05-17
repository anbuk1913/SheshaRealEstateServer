import { Router } from 'express';
import * as contactController from './contact.controller';

const router = Router();

// Public route
router.post('/', contactController.createContact);

// Admin routes
router.get('/', contactController.getContacts);
router.get('/stats', contactController.getContactStats);
router.get('/:id', contactController.getContactById);
router.patch('/:id/read', contactController.markAsRead);
router.delete('/:id', contactController.deleteContact);

export default router;
