"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("./user.repository");
class UserService {
    async login(email, password) {
        const realEmail = process.env.ADMIN_EMAIL;
        const realPassword = process.env.ADMIN_PASSWORD;
        if (email === realEmail && password === realPassword) {
            const token = jsonwebtoken_1.default.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return { token, user: { id: 'admin', name: 'Admin', email: realEmail, role: 'admin' } };
        }
        else {
            throw Object.assign(new Error('Invalid credentials'), { status: 401 });
        }
    }
    async register(payload) {
        const existing = await user_repository_1.userRepository.findByEmail(payload.email);
        if (existing)
            throw Object.assign(new Error('Email already in use'), { status: 400 });
        return user_repository_1.userRepository.create(payload);
    }
    async getProfile(id) {
        const user = await user_repository_1.userRepository.findById(id);
        if (!user)
            throw Object.assign(new Error('User not found'), { status: 404 });
        return user;
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
