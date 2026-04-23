import { Request, Response } from 'express';
import { contentService } from './content.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/apiResponse';

export const getAllContent = asyncHandler(async (_req: Request, res: Response) => {
  const content = await contentService.getAll();
  res.json(ok(content));
});

export const getContentByPage = asyncHandler(async (req: Request, res: Response) => {
  const content = await contentService.getByPage(req.params.page);
  res.json(ok(content));
});

export const getContentByKey = asyncHandler(async (req: Request, res: Response) => {
  const content = await contentService.getByKey(req.params.key);
  res.json(ok(content));
});

export const upsertContent = asyncHandler(async (req: Request, res: Response) => {
  const content = await contentService.upsert(req.params.key, req.body);
  res.json(ok(content, 'Content saved'));
});

export const deleteContent = asyncHandler(async (req: Request, res: Response) => {
  await contentService.delete(req.params.id);
  res.json(ok(null, 'Content deleted'));
});
