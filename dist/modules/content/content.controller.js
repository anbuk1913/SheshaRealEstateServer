"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.upsertContent = exports.getContentByKey = exports.getContentByPage = exports.getAllContent = void 0;
const content_service_1 = require("./content.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const apiResponse_1 = require("../../utils/apiResponse");
exports.getAllContent = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const content = await content_service_1.contentService.getAll();
    res.json((0, apiResponse_1.ok)(content));
});
exports.getContentByPage = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const content = await content_service_1.contentService.getByPage(req.params.page);
    res.json((0, apiResponse_1.ok)(content));
});
exports.getContentByKey = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const content = await content_service_1.contentService.getByKey(req.params.key);
    res.json((0, apiResponse_1.ok)(content));
});
exports.upsertContent = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const content = await content_service_1.contentService.upsert(req.params.key, req.body);
    res.json((0, apiResponse_1.ok)(content, 'Content saved'));
});
exports.deleteContent = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await content_service_1.contentService.delete(req.params.id);
    res.json((0, apiResponse_1.ok)(null, 'Content deleted'));
});
