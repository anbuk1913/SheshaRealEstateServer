"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyService = exports.PropertyService = void 0;
const property_repository_1 = require("./property.repository");
class PropertyService {
    async getAll(query) {
        const { page = 1, limit = 12, category, location, status, featured, search } = query;
        const filter = {};
        if (category)
            filter.category = category;
        if (location)
            filter.location = location;
        if (status)
            filter.status = status;
        if (featured)
            filter.featured = featured === 'true';
        if (search)
            filter.title = { $regex: search, $options: 'i' };
        return property_repository_1.propertyRepository.findAll(filter, Number(page), Number(limit));
    }
    async getBySlug(slug) {
        const property = await property_repository_1.propertyRepository.findBySlug(slug);
        if (!property)
            throw new Error('Property not found');
        return property;
    }
    // ← new
    async getById(id) {
        return property_repository_1.propertyRepository.findById(id);
    }
    async getFeatured() {
        return property_repository_1.propertyRepository.findFeatured();
    }
    async create(payload) {
        // if (!payload.slug && payload.title) {
        //   payload.slug = slugify(payload.title, { lower: true, strict: true });
        // }
        return property_repository_1.propertyRepository.create(payload);
    }
    async update(id, payload) {
        const updated = await property_repository_1.propertyRepository.update(id, payload);
        if (!updated)
            throw new Error('Property not found');
        return updated;
    }
    async delete(id) {
        const deleted = await property_repository_1.propertyRepository.delete(id);
        if (!deleted)
            throw new Error('Property not found');
        return deleted;
    }
    async getDashboardStats() {
        const [statusCounts, total] = await Promise.all([
            property_repository_1.propertyRepository.countByStatus(),
            property_repository_1.propertyRepository.findAll({}, 1, 1),
        ]);
        return { statusCounts, total: total.total };
    }
}
exports.PropertyService = PropertyService;
exports.propertyService = new PropertyService();
