"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const category_service_1 = require("./category.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const apiResponse_1 = require("../../utils/apiResponse");
exports.getCategories = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    res.json((0, apiResponse_1.ok)(await category_service_1.categoryService.getAll()));
});
exports.getCategory = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    res.json((0, apiResponse_1.ok)(await category_service_1.categoryService.getById(req.params.id)));
});
exports.createCategory = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    res.status(201).json((0, apiResponse_1.ok)(await category_service_1.categoryService.create(req.body), 'Category created'));
});
exports.updateCategory = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    res.json((0, apiResponse_1.ok)(await category_service_1.categoryService.update(req.params.id, req.body), 'Category updated'));
});
exports.deleteCategory = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await category_service_1.categoryService.delete(req.params.id);
    res.json((0, apiResponse_1.ok)(null, 'Category deleted'));
});
