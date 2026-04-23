import { Router } from 'express';
import * as ctrl from './blog.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

// Public
router.get('/',        ctrl.getBlogs);
router.get('/:slug',   ctrl.getBlog);

// Admin-protected
router.get('/admin/all',       protect, ctrl.adminGetBlogs);
router.post('/',               protect, ctrl.createBlog);
router.put('/:id',             protect, ctrl.updateBlog);
router.delete('/:id',          protect, ctrl.deleteBlog);

export default router;
