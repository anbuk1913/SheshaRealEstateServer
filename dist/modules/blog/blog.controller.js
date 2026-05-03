"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminGetBlogs = exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlog = exports.getBlogs = void 0;
const blog_service_1 = require("./blog.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const apiResponse_1 = require("../../utils/apiResponse");
const deleteFile_1 = require("../../utils/deleteFile");
exports.getBlogs = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const blogs = await blog_service_1.blogService.getAll(false);
    res.json((0, apiResponse_1.ok)(blogs));
});
exports.getBlog = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const blog = await blog_service_1.blogService.getBySlug(req.params.slug);
    res.json((0, apiResponse_1.ok)(blog));
});
exports.createBlog = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    try {
        const payload = {
            ...req.body,
            published: req.body.published === 'true',
            ...(req.file && { coverImage: `/uploads/blogs/${req.file.filename}` }),
        };
        const blog = await blog_service_1.blogService.create(payload);
        res.status(201).json((0, apiResponse_1.ok)(blog, 'Blog created'));
    }
    catch (err) {
        if (req.file)
            (0, deleteFile_1.deleteFile)(`/uploads/blogs/${req.file.filename}`);
        throw err;
    }
});
exports.updateBlog = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    try {
        const payload = {
            ...req.body,
            ...(req.body.published !== undefined && { published: req.body.published === 'true' }),
            ...(req.file && { coverImage: `/uploads/blogs/${req.file.filename}` }),
        };
        // Delete old cover image if a new one is being uploaded
        if (req.file) {
            const existing = await blog_service_1.blogService.getById(req.params.id);
            if (existing?.coverImage)
                (0, deleteFile_1.deleteFile)(existing.coverImage);
        }
        const blog = await blog_service_1.blogService.update(req.params.id, payload);
        res.json((0, apiResponse_1.ok)(blog, 'Blog updated'));
    }
    catch (err) {
        if (req.file)
            (0, deleteFile_1.deleteFile)(`/uploads/blogs/${req.file.filename}`);
        throw err;
    }
});
exports.deleteBlog = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const blog = await blog_service_1.blogService.getById(req.params.id);
    if (blog?.coverImage)
        (0, deleteFile_1.deleteFile)(blog.coverImage);
    await blog_service_1.blogService.delete(req.params.id);
    res.json((0, apiResponse_1.ok)(null, 'Blog deleted'));
});
exports.adminGetBlogs = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const blogs = await blog_service_1.blogService.getAll(true);
    res.json((0, apiResponse_1.ok)(blogs));
});
