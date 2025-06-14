"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const multerApp = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'D:/0 - Programming/ImageProcessing/backend/src/data/uploads' });
multerApp.post('/stats', upload.single('uploaded_file'), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any
    console.log(req.file, req.body);
});
multerApp.get("/", (req, res) => {
    res.send("multer route");
});
exports.default = multerApp;
