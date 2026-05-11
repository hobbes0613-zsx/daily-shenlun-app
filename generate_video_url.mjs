import { S3Storage } from "coze-coding-dev-sdk";

const storage = new S3Storage({
  endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
  accessKey: "",
  secretKey: "",
  bucketName: process.env.COZE_BUCKET_NAME,
  region: "cn-beijing",
});

// 生成新的签名URL
const url = await storage.generatePresignedUrl({ 
  key: "coze_storage_7631192723420282934/video/video_generate_cgt-20260511232545-2hgsw.mp4", 
  expireTime: 604800 // 7天有效期
});

console.log("视频URL:", url);
