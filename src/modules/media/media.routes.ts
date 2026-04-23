import { Router, Request, Response } from 'express';
import { protect } from '../../middlewares/auth.middleware';
import { upload } from '../../middlewares/upload.middleware';
import { ok } from '../../utils/apiResponse';
import path from 'path';
import fs from 'fs';

const router = Router();

// Upload single image (admin only)
router.post(
  '/upload',
  protect,
  upload.single('image'),
  (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }
    const url = `/uploads/${req.file.filename}`;
    res.status(201).json(ok({ url, filename: req.file.filename }, 'Image uploaded'));
  }
);

// Delete image (admin only)
router.delete('/delete/:filename', protect, (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../../uploads', filename);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
    res.json(ok(null, 'Image deleted'));
  } else {
    res.status(404).json({ success: false, message: 'File not found' });
  }
});

export default router;
