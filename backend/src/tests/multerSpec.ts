import request from "supertest";
import app from "../index";
import path from "path";
import fs from "fs";

describe("POST /multer", () => {
  const uploadsDir = path.resolve(__dirname, "../../uploads");
  const testImagePath = path.join(uploadsDir, "testimage.jpg");

  beforeAll(() => {
    if (!fs.existsSync(testImagePath)) {
      fs.writeFileSync(testImagePath, Buffer.alloc(100));
    }
  });

  it("should upload and resize the image", async () => {
    const filename = "test_upload_" + Date.now();

    const res = await request(app)
      .post("/multer")
      .field("filename", filename)
      .field("width", "200")
      .field("height", "200")
      .attach("file", testImagePath);

    expect(res.status).toBe(200);
    expect(res.text.toLowerCase()).toContain("successfully");

    const expectedPath = path.join(uploadsDir, `${filename}.jpg`);
    expect(fs.existsSync(expectedPath)).toBeTrue();
  });

  it("should fail with missing fields", async () => {
    const res = await request(app)
      .post("/multer")
      .attach("file", testImagePath);

    expect(res.status).toBe(400);
    expect(res.text.toLowerCase()).toContain("missing required fields");
  });
});
