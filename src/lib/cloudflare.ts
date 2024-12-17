import { S3Client } from "@aws-sdk/client-s3";

const credentials = {
  accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY,
  secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY,
};

export const r2 = new S3Client([
  {
    region: "auto",
    endpoint: process.env.CLOUDFLARE_ENDPOINT,
    credentials,
  }
]);
