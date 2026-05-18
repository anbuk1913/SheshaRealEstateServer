"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProperty = exports.updateProperty = exports.createProperty = exports.getFeaturedProperties = exports.getProperty = exports.getProperties = void 0;
const property_service_1 = require("./property.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const apiResponse_1 = require("../../utils/apiResponse");
const deleteFile_1 = require("../../utils/deleteFile");
exports.getProperties = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = await property_service_1.propertyService.getAll(req.query);
    res.json((0, apiResponse_1.ok)(result.data, 'Properties fetched', {
        page: result.page, total: result.total, totalPages: result.totalPages,
    }));
});
exports.getProperty = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    // Try slug first, then ID for backward compatibility
    let property = await property_service_1.propertyService.getBySlug(req.params.slug).catch(() => null);
    if (!property) {
        property = await property_service_1.propertyService.getById(req.params.slug);
    }
    res.json((0, apiResponse_1.ok)(property));
});
exports.getFeaturedProperties = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const properties = await property_service_1.propertyService.getFeatured();
    res.json((0, apiResponse_1.ok)(properties));
});
exports.createProperty = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    try {
        const files = req.files ?? [];
        const newImages = files.map(f => `/uploads/properties/${f.filename}`);
        const payload = {
            ...req.body,
            images: newImages,
            featured: req.body.featured === 'true',
            isNewProject: req.body.isNewProject === 'true',
            price: Number(req.body.price),
            area: Number(req.body.area),
        };
        const property = await property_service_1.propertyService.create(payload);
        res.status(201).json((0, apiResponse_1.ok)(property, 'Property created'));
    }
    catch (err) {
        const files = req.files ?? [];
        files.forEach(f => (0, deleteFile_1.deleteFile)(`/uploads/properties/${f.filename}`));
        throw err;
    }
});
exports.updateProperty = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    try {
        const files = req.files ?? [];
        const newImages = files.map(f => `/uploads/properties/${f.filename}`);
        // existingImages = images the frontend kept (sent as JSON array string)
        const existingImages = req.body.existingImages
            ? JSON.parse(req.body.existingImages)
            : [];
        // Delete images that were removed by the user
        const current = await property_service_1.propertyService.getById(req.params.id);
        if (current) {
            const removed = (current.images ?? []).filter(img => !existingImages.includes(img));
            removed.forEach(img => (0, deleteFile_1.deleteFile)(img));
        }
        const payload = {
            ...req.body,
            images: [...existingImages, ...newImages],
            featured: req.body.featured === 'true',
            isNewProject: req.body.isNewProject === 'true',
            price: Number(req.body.price),
            bedrooms: Number(req.body.bedrooms),
            bathrooms: Number(req.body.bathrooms),
            area: Number(req.body.area),
        };
        const property = await property_service_1.propertyService.update(req.params.id, payload);
        res.json((0, apiResponse_1.ok)(property, 'Property updated'));
    }
    catch (err) {
        const files = req.files ?? [];
        files.forEach(f => (0, deleteFile_1.deleteFile)(`/uploads/properties/${f.filename}`));
        throw err;
    }
});
exports.deleteProperty = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const property = await property_service_1.propertyService.getById(req.params.id);
    if (property?.images?.length) {
        property.images.forEach(img => (0, deleteFile_1.deleteFile)(img));
    }
    await property_service_1.propertyService.delete(req.params.id);
    res.json((0, apiResponse_1.ok)(null, 'Property deleted'));
});
