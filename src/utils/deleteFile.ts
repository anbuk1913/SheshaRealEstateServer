import fs from 'fs';
import path from 'path';

export const deleteFile = (filePath: string | null | undefined): void => {
  if (!filePath) return;
  // filePath is like /uploads/blogs/xxx.jpg — resolve from project root
  const abs = path.join(process.cwd(), filePath);
  fs.unlink(abs, (err) => {
    if (err && err.code !== 'ENOENT') console.error('deleteFile error:', err.message);
  });
};