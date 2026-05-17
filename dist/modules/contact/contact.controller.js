"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactStats = exports.deleteContact = exports.markAsRead = exports.getContactById = exports.getContacts = exports.createContact = void 0;
const contact_service_1 = require("./contact.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const apiResponse_1 = require("../../utils/apiResponse");
const service = new contact_service_1.ContactService();
exports.createContact = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json(new apiResponse_1.ApiResponse(false, 'Name, email, and message are required'));
    }
    const contact = await service.createContact({ name, email, phone, message });
    return res.status(201).json(new apiResponse_1.ApiResponse(true, 'Message sent successfully', contact));
});
exports.getContacts = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const result = await service.getContacts(skip, Number(limit), String(search));
    return res.status(200).json(new apiResponse_1.ApiResponse(true, 'Contacts retrieved successfully', result));
});
exports.getContactById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const contact = await service.getContactById(id);
    if (!contact) {
        return res.status(404).json(new apiResponse_1.ApiResponse(false, 'Contact not found'));
    }
    return res.status(200).json(new apiResponse_1.ApiResponse(true, 'Contact retrieved successfully', contact));
});
exports.markAsRead = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const contact = await service.markAsRead(id);
    if (!contact) {
        return res.status(404).json(new apiResponse_1.ApiResponse(false, 'Contact not found'));
    }
    return res.status(200).json(new apiResponse_1.ApiResponse(true, 'Contact marked as read', contact));
});
exports.deleteContact = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const contact = await service.deleteContact(id);
    if (!contact) {
        return res.status(404).json(new apiResponse_1.ApiResponse(false, 'Contact not found'));
    }
    return res.status(200).json(new apiResponse_1.ApiResponse(true, 'Contact deleted successfully'));
});
exports.getContactStats = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const stats = await service.getContactStats();
    return res.status(200).json(new apiResponse_1.ApiResponse(true, 'Stats retrieved successfully', stats));
});
