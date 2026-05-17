"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepository = void 0;
const contact_model_1 = __importDefault(require("./contact.model"));
class ContactRepository {
    async create(data) {
        return await contact_model_1.default.create(data);
    }
    async findAll(skip = 0, limit = 10, search = '') {
        const query = { isDeleted: false };
        if (search) {
            const regex = new RegExp(search, 'i');
            query.$or = [
                { name: regex },
                { email: regex },
            ];
        }
        const total = await contact_model_1.default.countDocuments(query);
        const data = await contact_model_1.default.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
        return { data, total };
    }
    async findById(id) {
        return await contact_model_1.default.findById(id);
    }
    async markAsRead(id) {
        return await contact_model_1.default.findByIdAndUpdate(id, { isRead: true }, { new: true });
    }
    async softDelete(id) {
        return await contact_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    }
    async hardDelete(id) {
        const result = await contact_model_1.default.findByIdAndDelete(id);
        return !!result;
    }
    async getStats() {
        const total = await contact_model_1.default.countDocuments({ isDeleted: false });
        const unread = await contact_model_1.default.countDocuments({ isDeleted: false, isRead: false });
        return { total, unread };
    }
}
exports.ContactRepository = ContactRepository;
