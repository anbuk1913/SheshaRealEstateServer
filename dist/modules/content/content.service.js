"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentService = exports.ContentService = void 0;
const content_repository_1 = require("./content.repository");
class ContentService {
    async getAll() {
        return content_repository_1.contentRepository.findAll();
    }
    async getByPage(page) {
        return content_repository_1.contentRepository.findByPage(page);
    }
    async getByKey(key) {
        const content = await content_repository_1.contentRepository.findByKey(key);
        if (!content)
            throw Object.assign(new Error('Content not found'), { status: 404 });
        return content;
    }
    async upsert(key, payload) {
        return content_repository_1.contentRepository.upsert(key, payload);
    }
    async delete(id) {
        const deleted = await content_repository_1.contentRepository.delete(id);
        if (!deleted)
            throw Object.assign(new Error('Content not found'), { status: 404 });
        return deleted;
    }
}
exports.ContentService = ContentService;
exports.contentService = new ContentService();
