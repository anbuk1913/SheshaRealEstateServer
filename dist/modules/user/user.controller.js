"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.register = exports.login = void 0;
const user_service_1 = require("./user.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const apiResponse_1 = require("../../utils/apiResponse");
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    const result = await user_service_1.userService.login(email, password);
    res.json((0, apiResponse_1.ok)(result, 'Login successful'));
});
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await user_service_1.userService.register(req.body);
    res.status(201).json((0, apiResponse_1.ok)(user, 'Admin registered'));
});
exports.getProfile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await user_service_1.userService.getProfile(req.user.id);
    res.json((0, apiResponse_1.ok)(user));
});
