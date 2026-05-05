"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRepository = exports.LocationRepository = void 0;
const location_model_1 = __importDefault(require("./location.model"));
class LocationRepository {
    findAll() { return location_model_1.default.find().sort({ city: 1, area: 1 }); }
    findById(id) { return location_model_1.default.findById(id); }
    findBySlug(slug) { return location_model_1.default.findOne({ slug }); }
    create(p) { return location_model_1.default.create(p); }
    update(id, p) {
        return location_model_1.default.findByIdAndUpdate(id, p, { new: true, runValidators: true });
    }
    delete(id) { return location_model_1.default.findByIdAndDelete(id); }
}
exports.LocationRepository = LocationRepository;
exports.locationRepository = new LocationRepository();
