"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_middleware_1 = require("/Users/reihanoktavio/Documents/Sanbercode/tugasNodeJS/source-code-multer/src/middlewares/upload.middleware");
const cloudinary_1 = require("/Users/reihanoktavio/Documents/Sanbercode/tugasNodeJS/source-code-multer/src/utils/cloudinary");
const router = express_1.default.Router();
router.post("/single", upload_middleware_1.single, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    try {
        const result = yield (0, cloudinary_1.handleUpload)(req.file.buffer.toString("base64"));
        res.status(200).json({ message: "File uploaded successfully", data: result });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to upload file", error });
    }
}));
router.post("/multiple", upload_middleware_1.multiple, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
    }
    try {
        const results = yield Promise.all(req.files.map(file => (0, cloudinary_1.handleUpload)(file.buffer.toString("base64"))));
        res.status(200).json({ message: "Files uploaded successfully", data: results });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to upload files", error });
    }
}));
exports.default = router;
