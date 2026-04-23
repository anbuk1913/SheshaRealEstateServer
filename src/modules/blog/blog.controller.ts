import { Request, Response } from 'express';
import { blogService } from './blog.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/apiResponse';

export const getBlogs = asyncHandler(async (req: Request, res: Response) => {
  const blogs = await blogService.getAll(false);
  res.json(ok(blogs));
});

export const getBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.getBySlug(req.params.slug);
  res.json(ok(blog));
});

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.create(req.body);
  res.status(201).json(ok(blog, 'Blog created'));
});

export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.update(req.params.id, req.body);
  res.json(ok(blog, 'Blog updated'));
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  await blogService.delete(req.params.id);
  res.json(ok(null, 'Blog deleted'));
});

export const adminGetBlogs = asyncHandler(async (_req: Request, res: Response) => {
  const blogs = await blogService.getAll(true);
  res.json(ok(blogs));
});
