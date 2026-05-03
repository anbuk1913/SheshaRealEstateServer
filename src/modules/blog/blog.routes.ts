import { Router } from 'express';
import * as ctrl from './blog.controller';
import { protect } from '../../middlewares/auth.middleware';
import { createUploader } from '../../utils/upload';

const router = Router();
const upload = createUploader('blogs', { maxSizeMB: 5 });

// Public
router.get('/',        ctrl.getBlogs);
router.get('/:slug',   ctrl.getBlog);

// Admin-protected
router.get('/admin/all',       protect, ctrl.adminGetBlogs);
router.post('/',               protect, upload.single('image'), ctrl.createBlog);
router.put('/:id',             protect, upload.single('image'), ctrl.updateBlog);
router.delete('/:id',          protect, ctrl.deleteBlog);

export default router;
