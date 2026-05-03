"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogService = exports.BlogService = void 0;
const slugify_1 = __importDefault(require("slugify"));
const blog_repository_1 = require("./blog.repository");
class BlogService {
    async getAll(admin = false) {
        return blog_repository_1.blogRepository.findAll(!admin);
    }
    async getBySlug(slug) {
        const blog = await blog_repository_1.blogRepository.findBySlug(slug);
        if (!blog)
            throw Object.assign(new Error('Blog not found'), { status: 404 });
        return blog;
    }
    async getById(id) {
        return blog_repository_1.blogRepository.findById(id);
    }
    async create(payload) {
        if (!payload.slug && payload.title) {
            payload.slug = (0, slugify_1.default)(payload.title, { lower: true, strict: true });
        }
        return blog_repository_1.blogRepository.create(payload);
    }
    async update(id, payload) {
        const updated = await blog_repository_1.blogRepository.update(id, payload);
        if (!updated)
            throw Object.assign(new Error('Blog not found'), { status: 404 });
        return updated;
    }
    async delete(id) {
        const deleted = await blog_repository_1.blogRepository.delete(id);
        if (!deleted)
            throw Object.assign(new Error('Blog not found'), { status: 404 });
        return deleted;
    }
}
exports.BlogService = BlogService;
exports.blogService = new BlogService();
