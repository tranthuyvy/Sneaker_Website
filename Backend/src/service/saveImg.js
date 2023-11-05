import { bucket } from "../config/firebase"
import { v4 as uuidv4 } from 'uuid';

// Hàm kiểm tra định dạng tệp ảnh
const isImageFile = (file) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp']; // Các đuôi tệp ảnh phổ biến
  const fileExtension = file.originalname.split('.').pop().toLowerCase();

  return imageExtensions.includes(fileExtension);
}


export default function saveImg(req, res) {
  const filenames = [];

  for (const file of req.files) {
    if (isImageFile(file)) {
      const filename = uuidv4();
      const blob = bucket.file(filename);
      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });
      blobWriter.on("error", (err) => {
        console.log(err);

      });

      blobWriter.on("finish", (data) => {
        console.log("uploaded");
      });

      blobWriter.end(file.buffer);
      filenames.push(filename);
    }
  }
  return filenames;
}