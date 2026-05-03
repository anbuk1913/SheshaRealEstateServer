"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProperty = exports.updateProperty = exports.createProperty = exports.getFeaturedProperties = exports.getProperty = exports.getProperties = void 0;
const property_service_1 = require("./property.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const apiResponse_1 = require("../../utils/apiResponse");
exports.getProperties = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = await property_service_1.propertyService.getAll(req.query);
    res.json((0, apiResponse_1.ok)(result.data, 'Properties fetched', {
        page: result.page, total: result.total, totalPages: result.totalPages
    }));
});
exports.getProperty = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const property = await property_service_1.propertyService.getBySlug(req.params.slug);
    res.json((0, apiResponse_1.ok)(property));
});
exports.getFeaturedProperties = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const properties = await property_service_1.propertyService.getFeatured();
    res.json((0, apiResponse_1.ok)(properties));
});
exports.createProperty = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const property = await property_service_1.propertyService.create(req.body);
    res.status(201).json((0, apiResponse_1.ok)(property, 'Property created'));
});
exports.updateProperty = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const property = await property_service_1.propertyService.update(req.params.id, req.body);
    res.json((0, apiResponse_1.ok)(property, 'Property updated'));
});
exports.deleteProperty = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await property_service_1.propertyService.delete(req.params.id);
    res.json((0, apiResponse_1.ok)(null, 'Property deleted'));
});
