import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "router";
const path = require("path");
import { createServer } from "http";
import bodyParser from "body-parser";
import multer from "multer";
dotenv.config();
const PORT = process.env.PORT || 8080;
export default function run(app) {
  const storage = multer.memoryStorage()
  const upload = multer({
    storage: multer.memoryStorage(),
    fieldSize: 4 * 1024 * 1024
  });
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(upload.any("file"));
  app.use("/public", express.static(path.join(__dirname, "../public")));
  const httpServer = createServer(app);
  router(app);
  httpServer.listen(PORT, () => {
    console.log("");
  });
}
