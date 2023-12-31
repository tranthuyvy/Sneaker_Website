import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "router";
const path = require("path");
import { createServer } from "http";
import bodyParser from "body-parser";
import multer from "multer";
import socket from "service/socket";
dotenv.config();
const PORT = process.env.PORT || 8080;
export default function run(app) {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 4 * 1024 * 1024 // Giới hạn kích thước tệp tải lên là 4MB
    }
  }).any("file")
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err)
        return res.status(500).send({ code: err.code })
      } else if (err) {
        console.log(err)
        return res.status(500).send({ code: '006' })
        // An unknown error occurred when uploading.
      }
      next()
    })
  });

  app.use("/public", express.static(path.join(__dirname, "../public")));
  const httpServer = createServer(app);
  socket(httpServer)
  router(app);
  httpServer.listen(PORT, () => {
  });
}
