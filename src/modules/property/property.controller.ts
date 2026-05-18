import { Request, Response } from 'express';
import { propertyService } from './property.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ok } from '../../utils/apiResponse';
import { deleteFile } from '../../utils/deleteFile';

export const getProperties = asyncHandler(async (req, res) => {
  const result = await propertyService.getAll(req.query);
  res.json(ok(result.data, 'Properties fetched', {
    page: result.page, total: result.total, totalPages: result.totalPages,
  }));
});

export const getProperty = asyncHandler(async (req, res) => {
  // Try slug first, then ID for backward compatibility
  let property = await propertyService.getBySlug(req.params.slug).catch(() => null);
  if (!property) {
    property = await propertyService.getById(req.params.slug);
  }
  res.json(ok(property));
});

export const getFeaturedProperties = asyncHandler(async (req, res) => {
  const properties = await propertyService.getFeatured();
  res.json(ok(properties));
});

export const createProperty = asyncHandler(async (req: Request, res: Response) => {
  try {
    const files = (req.files as Express.Multer.File[]) ?? [];
    const newImages = files.map(f => `/uploads/properties/${f.filename}`);

    const payload = {
      ...req.body,
      images:       newImages,
      featured:     req.body.featured     === 'true',
      isNewProject: req.body.isNewProject === 'true',
      price:        Number(req.body.price),
      area:         Number(req.body.area),
    };

    const property = await propertyService.create(payload);
    res.status(201).json(ok(property, 'Property created'));
  } catch (err) {
    const files = (req.files as Express.Multer.File[]) ?? [];
    files.forEach(f => deleteFile(`/uploads/properties/${f.filename}`));
    throw err;
  }
});

export const updateProperty = asyncHandler(async (req: Request, res: Response) => {
  try {
    const files = (req.files as Express.Multer.File[]) ?? [];
    const newImages = files.map(f => `/uploads/properties/${f.filename}`);

    // existingImages = images the frontend kept (sent as JSON array string)
    const existingImages: string[] = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : [];

    // Delete images that were removed by the user
    const current = await propertyService.getById(req.params.id);
    if (current) {
      const removed = (current.images ?? []).filter(img => !existingImages.includes(img));
      removed.forEach(img => deleteFile(img));
    }

    const payload = {
      ...req.body,
      images:       [...existingImages, ...newImages],
      featured:     req.body.featured     === 'true',
      isNewProject: req.body.isNewProject === 'true',
      price:        Number(req.body.price),
      bedrooms:     Number(req.body.bedrooms),
      bathrooms:    Number(req.body.bathrooms),
      area:         Number(req.body.area),
    };

    const property = await propertyService.update(req.params.id, payload);
    res.json(ok(property, 'Property updated'));
  } catch (err) {
    const files = (req.files as Express.Multer.File[]) ?? [];
    files.forEach(f => deleteFile(`/uploads/properties/${f.filename}`));
    throw err;
  }
});

export const deleteProperty = asyncHandler(async (req: Request, res: Response) => {
  const property = await propertyService.getById(req.params.id);
  if (property?.images?.length) {
    property.images.forEach(img => deleteFile(img));
  }
  await propertyService.delete(req.params.id);
  res.json(ok(null, 'Property deleted'));
});