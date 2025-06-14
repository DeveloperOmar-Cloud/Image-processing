"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const multerApp = express_1.default.Router();
multerApp.use((0, cors_1.default)());
multerApp.get("/", (req, res) => {
    res.send("multer route");
});
const uploadsDirectory = "D:/0 - Programming/ImageProcessing/backend/src/routes/api/uploads/";
if (!fs_1.default.existsSync(uploadsDirectory)) {
    fs_1.default.mkdirSync(uploadsDirectory, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path_1.default.join(process.cwd(), "uploads");
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, "uploaded_" + Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage: storage });
multerApp.post("/", upload.single("file"), (req, res) => {
    if (!req.file) {
        res.status(400).send("No file uploaded");
        return;
    }
    console.log("Uploaded file:", req.file);
    res.status(200).send("File uploaded");
});
exports.default = multerApp;
