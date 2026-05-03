import { Request, Response } from 'express';
import { blogService } from './blog.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/apiResponse';
import { deleteFile } from '../../utils/deleteFile';

export const getBlogs = asyncHandler(async (req: Request, res: Response) => {
  const blogs = await blogService.getAll(false);
  res.json(ok(blogs));
});

export const getBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.getBySlug(req.params.slug);
  res.json(ok(blog));
});

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  try {
    const payload = {
      ...req.body,
      published: req.body.published === 'true',
      ...(req.file && { coverImage: `/uploads/blogs/${req.file.filename}` }),
    }
    const blog = await blogService.create(payload)
    res.status(201).json(ok(blog, 'Blog created'))
  } catch (err) {
    if (req.file) deleteFile(`/uploads/blogs/${req.file.filename}`)
    throw err
  }
});

export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  try {
    const payload = {
      ...req.body,
      ...(req.body.published !== undefined && { published: req.body.published === 'true' }),
      ...(req.file && { coverImage: `/uploads/blogs/${req.file.filename}` }),
    };

    // Delete old cover image if a new one is being uploaded
    if (req.file) {
      const existing = await blogService.getById(req.params.id);
      if (existing?.coverImage) deleteFile(existing.coverImage);
    }

    const blog = await blogService.update(req.params.id, payload);
    res.json(ok(blog, 'Blog updated'));
  } catch (err) {
    if (req.file) deleteFile(`/uploads/blogs/${req.file.filename}`);
    throw err;
  }
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.getById(req.params.id);
  if (blog?.coverImage) deleteFile(blog.coverImage);

  await blogService.delete(req.params.id);
  res.json(ok(null, 'Blog deleted'));
})

export const adminGetBlogs = asyncHandler(async (_req: Request, res: Response) => {
  const blogs = await blogService.getAll(true);
  res.json(ok(blogs));
});
