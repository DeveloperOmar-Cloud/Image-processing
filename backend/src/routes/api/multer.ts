import express from "express";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const multerApp = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const uploadsDir = path.resolve(__dirname, "../../../uploads");
console.log("multer.ts uploadsDir", uploadsDir);
fs.mkdirSync(uploadsDir, { recursive: true });

multerApp.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const { filename, width, height } = req.body;

    if (!file || !filename || !width || !height) {
      res.status(400).send("Missing required fields");
      return;
    }

    const finalFilename =
      filename + path.extname(file.originalname).toLowerCase();
    const finalPath = path.join(uploadsDir, finalFilename);

    console.log("Saving resized image to:", finalPath);

    await sharp(file.buffer)
      .resize(parseInt(width), parseInt(height))
      .toFile(finalPath);

    res.status(200).send("File uploaded and resized successfully");
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).send("Failed to upload file");
  }
});

export default multerApp;
