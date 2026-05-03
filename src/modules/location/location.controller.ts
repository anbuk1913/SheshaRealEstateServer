import { Request, Response } from 'express';
import { locationService } from './location.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/apiResponse';

export const getLocations    = asyncHandler(async (_req: Request, res: Response) => {
  res.json(ok(await locationService.getAll()));
});
export const getLocation     = asyncHandler(async (req: Request, res: Response) => {
  res.json(ok(await locationService.getById(req.params.id)));
});
export const createLocation  = asyncHandler(async (req: Request, res: Response) => {
  res.status(201).json(ok(await locationService.create(req.body), 'Location created'));
});
export const updateLocation  = asyncHandler(async (req: Request, res: Response) => {
  res.json(ok(await locationService.update(req.params.id, req.body), 'Location updated'));
});
export const deleteLocation  = asyncHandler(async (req: Request, res: Response) => {
  await locationService.delete(req.params.id);
  res.json(ok(null, 'Location deleted'));
});