"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const user_model_1 = __importDefault(require("./user.model"));
class UserRepository {
    async findByEmail(email) {
        return user_model_1.default.findOne({ email });
    }
    async findById(id) {
        return user_model_1.default.findById(id);
    }
    async create(payload) {
        return user_model_1.default.create(payload);
    }
    async update(id, payload) {
        return user_model_1.default.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
