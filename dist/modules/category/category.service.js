"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = exports.CategoryService = void 0;
const slugify_1 = __importDefault(require("slugify"));
const category_repository_1 = require("./category.repository");
class CategoryService {
    getAll() { return category_repository_1.categoryRepository.findAll(); }
    async getById(id) {
        const cat = await category_repository_1.categoryRepository.findById(id);
        if (!cat)
            throw Object.assign(new Error('Category not found'), { status: 404 });
        return cat;
    }
    async create(payload) {
        if (!payload.slug && payload.name) {
            payload.slug = (0, slugify_1.default)(payload.name, { lower: true, strict: true });
        }
        return category_repository_1.categoryRepository.create(payload);
    }
    async update(id, payload) {
        const updated = await category_repository_1.categoryRepository.update(id, payload);
        if (!updated)
            throw Object.assign(new Error('Category not found'), { status: 404 });
        return updated;
    }
    async delete(id) {
        const deleted = await category_repository_1.categoryRepository.delete(id);
        if (!deleted)
            throw Object.assign(new Error('Category not found'), { status: 404 });
        return deleted;
    }
}
exports.CategoryService = CategoryService;
exports.categoryService = new CategoryService();
