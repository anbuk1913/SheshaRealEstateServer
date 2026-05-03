"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRepository = exports.ContentRepository = void 0;
const content_model_1 = __importDefault(require("./content.model"));
class ContentRepository {
    async findAll() {
        return content_model_1.default.find().sort({ page: 1, key: 1 });
    }
    async findByKey(key) {
        return content_model_1.default.findOne({ key });
    }
    async findByPage(page) {
        return content_model_1.default.find({ page });
    }
    async upsert(key, payload) {
        return content_model_1.default.findOneAndUpdate({ key }, { ...payload, key }, { new: true, upsert: true, runValidators: true });
    }
    async delete(id) {
        return content_model_1.default.findByIdAndDelete(id);
    }
}
exports.ContentRepository = ContentRepository;
exports.contentRepository = new ContentRepository();
