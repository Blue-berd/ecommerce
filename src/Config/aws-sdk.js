import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import supabase from "./supabase.js";
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

const uploadToSupabase = async (bucket, file, accessToken) => {
  const filePath = `public/${uuidv4()}_${file.originalname}`;

  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

    if (error) {
      throw new ApplicationError(error.message, 400);
    }

    console.log("file data", data);
    const fileUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${filePath}`;
    return fileUrl;
  } catch (error) {
    console.log("ERROR----", error);
    throw new ApplicationError(error.message, 400);
  }
};

export default uploadToSupabase;
