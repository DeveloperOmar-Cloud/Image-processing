import express from "express";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const sharpApp = express.Router();

sharpApp.get("/", async (req, res) => {
  const { filename, width, height } = req.query;

  const parsedWidth = parseInt(width as string, 10);
  const parsedHeight = parseInt(height as string, 10);

  if (
    !filename ||
    !parsedWidth ||
    !parsedHeight ||
    parsedWidth <= 0 ||
    parsedHeight <= 0
  ) {
    res.status(400).send("Invalid dimensions or missing parameters");
    return;
  }

  const uploadsDir = path.resolve(__dirname, "../../../uploads");
  const ext = path.extname(filename as string) || ".jpg";
  const baseName = path.basename(filename as string, ext);
  const originalPath = path.join(uploadsDir, filename as string);

  if (!fs.existsSync(originalPath)) {
    res.status(404).send("Original image not found");
    return;
  }

  const resizedFilename = `${baseName}_${parsedWidth}x${parsedHeight}${ext}`;
  const resizedPath = path.join(uploadsDir, resizedFilename);

  try {
    await sharp(originalPath)
      .resize(parsedWidth, parsedHeight)
      .toFile(resizedPath);
    res.json({ url: `/uploads/${resizedFilename}` });
    return;
  } catch (err) {
    console.error("Sharp resize error:", err);
    res.status(500).send("Failed to resize image");
    return;
  }
});

export default sharpApp;
