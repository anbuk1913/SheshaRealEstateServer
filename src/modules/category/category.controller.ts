import { Request, Response } from 'express';
import { categoryService } from './category.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/apiResponse';

export const getCategories   = asyncHandler(async (_req: Request, res: Response) => {
  res.json(ok(await categoryService.getAll()));
});
export const getCategory     = asyncHandler(async (req: Request, res: Response) => {
  res.json(ok(await categoryService.getById(req.params.id)));
});
export const createCategory  = asyncHandler(async (req: Request, res: Response) => {
  res.status(201).json(ok(await categoryService.create(req.body), 'Category created'));
});
export const updateCategory  = asyncHandler(async (req: Request, res: Response) => {
  res.json(ok(await categoryService.update(req.params.id, req.body), 'Category updated'));
});
export const deleteCategory  = asyncHandler(async (req: Request, res: Response) => {
  await categoryService.delete(req.params.id);
  res.json(ok(null, 'Category deleted'));
});