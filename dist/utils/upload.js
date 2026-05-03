"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const createStorage = (folder) => {
    const dest = path_1.default.join('uploads', folder);
    if (!fs_1.default.existsSync(dest))
        fs_1.default.mkdirSync(dest, { recursive: true });
    return multer_1.default.diskStorage({
        destination: (_req, _file, cb) => cb(null, dest),
        filename: (_req, file, cb) => {
            const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${unique}${path_1.default.extname(file.originalname)}`);
        },
    });
};
const fileFilter = (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const validExt = allowed.test(path_1.default.extname(file.originalname).toLowerCase());
    const validMime = allowed.test(file.mimetype);
    if (validExt && validMime)
        cb(null, true);
    else
        cb(new Error('Only images allowed (jpeg, jpg, png, webp)'));
};
const createUploader = (folder, options = {}) => (0, multer_1.default)({
    storage: createStorage(folder),
    fileFilter,
    limits: { fileSize: (options.maxSizeMB ?? 5) * 1024 * 1024 },
});
exports.createUploader = createUploader;
