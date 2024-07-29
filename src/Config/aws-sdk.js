import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { ApplicationError } from "../ErrorHandler/applicationError.js";
dotenv.config();

const s3Client = new S3Client({
  //   forcePathStyle: true,
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadToSpaces = async (bucket, file) => {
  const params = {
    Bucket: bucket,
    Key: `${uuidv4()}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);
    const fileUrl = `${process.env.AWS_ENDPOINT_URL}${bucket}${params.Key}`;
    return { fieldname: file.fieldname, path: fileUrl };
  } catch (error) {
    throw new ApplicationError(error.message, 400);
  }
};

export default uploadToSpaces;
