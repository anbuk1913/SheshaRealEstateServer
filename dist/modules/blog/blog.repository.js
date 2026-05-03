"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRepository = exports.BlogRepository = void 0;
const blog_model_1 = __importDefault(require("./blog.model"));
class BlogRepository {
    async findAll(onlyPublished = true) {
        const filter = onlyPublished ? { published: true } : {};
        return blog_model_1.default.find(filter).sort({ createdAt: -1 });
    }
    async findBySlug(slug) {
        return blog_model_1.default.findOne({ slug });
    }
    async findById(id) {
        return blog_model_1.default.findById(id);
    }
    async create(payload) {
        return blog_model_1.default.create(payload);
    }
    async update(id, payload) {
        return blog_model_1.default.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    }
    async delete(id) {
        return blog_model_1.default.findByIdAndDelete(id);
    }
}
exports.BlogRepository = BlogRepository;
exports.blogRepository = new BlogRepository();
