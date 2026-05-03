import multer, { StorageEngine, FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

const createStorage = (folder: string): StorageEngine => {
  const dest = path.join('uploads', folder);
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  return multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, dest),
    filename: (_req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${unique}${path.extname(file.originalname)}`);
    },
  });
};

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowed = /jpeg|jpg|png|webp/;
  const validExt  = allowed.test(path.extname(file.originalname).toLowerCase());
  const validMime = allowed.test(file.mimetype);
  if (validExt && validMime) cb(null, true);
  else cb(new Error('Only images allowed (jpeg, jpg, png, webp)'));
};

interface UploaderOptions { maxSizeMB?: number; }

export const createUploader = (folder: string, options: UploaderOptions = {}) =>
  multer({
    storage: createStorage(folder),
    fileFilter,
    limits: { fileSize: (options.maxSizeMB ?? 5) * 1024 * 1024 },
  });