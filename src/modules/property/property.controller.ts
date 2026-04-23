import { Request, Response } from 'express';
import { propertyService } from './property.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/apiResponse';

export const getProperties = asyncHandler(async (req, res) => {
  const result = await propertyService.getAll(req.query);
  res.json(ok(result.data, 'Properties fetched', {
    page: result.page, total: result.total, totalPages: result.totalPages
  }));
});

export const getProperty = asyncHandler(async (req, res) => {
  const property = await propertyService.getBySlug(req.params.slug);
  res.json(ok(property));
});

export const getFeaturedProperties = asyncHandler(async (req, res) => {
  const properties = await propertyService.getFeatured();
  res.json(ok(properties));
});

export const createProperty = asyncHandler(async (req, res) => {
  const property = await propertyService.create(req.body);
  res.status(201).json(ok(property, 'Property created'));
});

export const updateProperty = asyncHandler(async (req, res) => {
  const property = await propertyService.update(req.params.id, req.body);
  res.json(ok(property, 'Property updated'));
});

export const deleteProperty = asyncHandler(async (req, res) => {
  await propertyService.delete(req.params.id);
  res.json(ok(null, 'Property deleted'));
});