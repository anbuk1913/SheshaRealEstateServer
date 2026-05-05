"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationService = exports.LocationService = void 0;
const slugify_1 = __importDefault(require("slugify"));
const location_repository_1 = require("./location.repository");
class LocationService {
    getAll() { return location_repository_1.locationRepository.findAll(); }
    async getById(id) {
        const loc = await location_repository_1.locationRepository.findById(id);
        if (!loc)
            throw Object.assign(new Error('Location not found'), { status: 404 });
        return loc;
    }
    async create(payload) {
        if (!payload.slug) {
            const base = [payload.city, payload.area].filter(Boolean).join(' ');
            payload.slug = (0, slugify_1.default)(base, { lower: true, strict: true });
        }
        return location_repository_1.locationRepository.create(payload);
    }
    async update(id, payload) {
        const updated = await location_repository_1.locationRepository.update(id, payload);
        if (!updated)
            throw Object.assign(new Error('Location not found'), { status: 404 });
        return updated;
    }
    async delete(id) {
        const deleted = await location_repository_1.locationRepository.delete(id);
        if (!deleted)
            throw Object.assign(new Error('Location not found'), { status: 404 });
        return deleted;
    }
}
exports.LocationService = LocationService;
exports.locationService = new LocationService();
