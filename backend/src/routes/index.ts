import express from "express";
import sharp from "./api/sharp";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("main API");
});

routes.use("/sharp", sharp);

export default routes;
