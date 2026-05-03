"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const apiResponse_1 = require("../../utils/apiResponse");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
// Upload single image (admin only)
router.post('/upload', auth_middleware_1.protect, upload_middleware_1.upload.single('image'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ success: false, message: 'No file uploaded' });
        return;
    }
    const url = `/uploads/${req.file.filename}`;
    res.status(201).json((0, apiResponse_1.ok)({ url, filename: req.file.filename }, 'Image uploaded'));
});
// Delete image (admin only)
router.delete('/delete/:filename', auth_middleware_1.protect, (req, res) => {
    const filename = req.params.filename;
    const filepath = path_1.default.join(__dirname, '../../uploads', filename);
    if (fs_1.default.existsSync(filepath)) {
        fs_1.default.unlinkSync(filepath);
        res.json((0, apiResponse_1.ok)(null, 'Image deleted'));
    }
    else {
        res.status(404).json({ success: false, message: 'File not found' });
    }
});
exports.default = router;
