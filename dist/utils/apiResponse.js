"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fail = exports.ok = exports.ApiResponse = void 0;
class ApiResponse {
    constructor(success, message, data, meta) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.meta = meta;
    }
}
exports.ApiResponse = ApiResponse;
const ok = (data, message = 'Success', meta) => new ApiResponse(true, message, data, meta);
exports.ok = ok;
const fail = (message) => new ApiResponse(false, message);
exports.fail = fail;
