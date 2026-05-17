"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const contact_repository_1 = require("./contact.repository");
class ContactService {
    constructor() {
        this.repo = new contact_repository_1.ContactRepository();
    }
    async createContact(data) {
        return await this.repo.create(data);
    }
    async getContacts(skip = 0, limit = 10, search = '') {
        return await this.repo.findAll(skip, limit, search);
    }
    async getContactById(id) {
        return await this.repo.findById(id);
    }
    async markAsRead(id) {
        return await this.repo.markAsRead(id);
    }
    async deleteContact(id) {
        return await this.repo.softDelete(id);
    }
    async permanentlyDeleteContact(id) {
        return await this.repo.hardDelete(id);
    }
    async getContactStats() {
        return await this.repo.getStats();
    }
}
exports.ContactService = ContactService;
