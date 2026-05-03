"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deleteFile = (filePath) => {
    if (!filePath)
        return;
    // filePath is like /uploads/blogs/xxx.jpg — resolve from project root
    const abs = path_1.default.join(process.cwd(), filePath);
    fs_1.default.unlink(abs, (err) => {
        if (err && err.code !== 'ENOENT')
            console.error('deleteFile error:', err.message);
    });
};
exports.deleteFile = deleteFile;
