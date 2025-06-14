import express from "express";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const sharpApp = express.Router();

const uploadsDir = path.resolve(__dirname, "../../../uploads");

sharpApp.get("/", async (req, res) => {
  const { filename, width, height } = req.query;

  if (!filename || !width || !height) {
    res.status(400).send("Missing required query parameters");
    return;
  }

  const widthNum = parseInt(width as string, 10);
  const heightNum = parseInt(height as string, 10);
  const ext = path.extname(filename as string);
  const base = path.basename(filename as string, ext);

  const originalPath = path.join(uploadsDir, filename as string);
  const resizedFilename = `${base}_${width}x${height}${ext}`;
  const resizedPath = path.join(uploadsDir, resizedFilename);

  if (!fs.existsSync(originalPath)) {
    res.status(404).send("original image wasn't found");
    return;
  }

  try {
    // creates resized version if it doesnt exist
    if (!fs.existsSync(resizedPath)) {
      await sharp(originalPath).resize(widthNum, heightNum).toFile(resizedPath);
    }

    const publicUrl = `/uploads/${resizedFilename}`;
    res.json({ url: publicUrl }); // ✅ This is what the frontend expects
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to resize image");
  }
});

export default sharpApp;
