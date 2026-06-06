import { env } from '@/core/env';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2 } from './client';

export async function uploadToR2(key: string, file: File) {
  const buffer = await file.arrayBuffer();

  await r2.send(
    new PutObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: key,
      Body: new Uint8Array(buffer),
      ContentType: file.type,
    }),
  );
}
