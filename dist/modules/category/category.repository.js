"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRepository = exports.CategoryRepository = void 0;
const category_model_1 = __importDefault(require("./category.model"));
class CategoryRepository {
    findAll() { return category_model_1.default.find().sort({ name: 1 }); }
    findById(id) { return category_model_1.default.findById(id); }
    findBySlug(slug) { return category_model_1.default.findOne({ slug }); }
    create(p) { return category_model_1.default.create(p); }
    update(id, p) {
        return category_model_1.default.findByIdAndUpdate(id, p, { new: true, runValidators: true });
    }
    delete(id) { return category_model_1.default.findByIdAndDelete(id); }
}
exports.CategoryRepository = CategoryRepository;
exports.categoryRepository = new CategoryRepository();
