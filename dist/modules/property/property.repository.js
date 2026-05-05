"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyRepository = exports.PropertyRepository = void 0;
const property_model_1 = __importDefault(require("./property.model"));
class PropertyRepository {
    async findAll(filter, page = 1, limit = 12) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            property_model_1.default.find(filter)
                .populate('location', 'city area')
                .populate('category', 'name')
                .sort({ createdAt: -1 })
                .skip(skip).limit(limit),
            property_model_1.default.countDocuments(filter),
        ]);
        return { data, total, page, totalPages: Math.ceil(total / limit) };
    }
    async findById(id) {
        return property_model_1.default.findById(id)
            .populate('location').populate('category');
    }
    async findBySlug(slug) {
        return property_model_1.default.findOne({ slug })
            .populate('location').populate('category');
    }
    async findFeatured() {
        return property_model_1.default.find({ featured: true, status: 'available' })
            .populate('location', 'city area').limit(6);
    }
    async create(payload) {
        return property_model_1.default.create(payload);
    }
    async update(id, payload) {
        return property_model_1.default.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    }
    async delete(id) {
        return property_model_1.default.findByIdAndDelete(id);
    }
    async countByStatus() {
        return property_model_1.default.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
    }
}
exports.PropertyRepository = PropertyRepository;
exports.propertyRepository = new PropertyRepository();
