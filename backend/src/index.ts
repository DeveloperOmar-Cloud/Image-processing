import express from "express";
import path from "path";
import routes from "./routes/index";
import multerApp from "./routes/api/multer";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsDir = path.resolve(__dirname, "../uploads");
console.log("index.ts uploadsDir:", uploadsDir);
app.use("/uploads", express.static(uploadsDir));
app.use("/api", routes);
app.use("/multer", multerApp);

app.use(express.static(path.join(__dirname, "../../frontend/src")));

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction
  ) => {
    console.error("Global error handler:", err);
    res.status(500).send("Internal server error");
  }
);

app.get("/uploads", (req, res) => {
  const uploadDir = path.join(__dirname, "../uploads");

  fs.readdir(uploadDir, (err: unknown, files: string[]) => {
    if (err) {
      console.error("Error reading uploads:", err);
      return res.status(500).json({ error: "Failed to read uploads." });
    }

    const jpgs = files.filter((f: string) => /\.(jpg|jpeg)$/i.test(f));
    res.json(jpgs);
  });
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
