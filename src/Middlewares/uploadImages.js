import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import uploadToSpaces from "../Config/aws-sdk.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const multerMemoryStorage = multer.memoryStorage();

const multerUpload = multer({
  storage: multerMemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export const uploadImages = (bucket) => {
  return async (req, res, next) => {
    multerUpload.any()(req, res, async (err) => {
      if (!req.files || req.files.length === 0) {
        console.log("file upload skipped");
        next();
      }
      if (err) {
        return next(err);
      }
      try {
        const uploadedFileUrls = [];
        for (const file of req.files) {
          const fileUrl = await uploadToSpaces(bucket, file);
          console.log("file url in middleware", fileUrl);
          uploadedFileUrls.push(fileUrl);
        }
        const filePaths = uploadedFileUrls.map((file) => file.path);
        req.images = filePaths;
        req.fileUrls = uploadedFileUrls;
        next();
      } catch (error) {
        next(error);
      }
    });
  };
};
