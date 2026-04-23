import { Request, Response } from 'express';
import { userService } from './user.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/apiResponse';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await userService.login(email, password);
  res.json(ok(result, 'Login successful'));
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.register(req.body);
  res.status(201).json(ok(user, 'Admin registered'));
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getProfile((req as any).user.id);
  res.json(ok(user));
});
