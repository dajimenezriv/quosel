import { env } from '@/core/env';
import { DeleteObjectCommand, DeleteObjectsCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

export class R2 {
  static async upload(Key: string, file: File) {
    const buffer = await file.arrayBuffer();

    await r2.send(
      new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key,
        Body: new Uint8Array(buffer),
        ContentType: file.type,
      }),
    );
  }

  static async uploadMany(files: Array<{ key: string; file: File }>) {
    await Promise.all(files.map(({ key, file }) => this.upload(key, file)));
  }

  static async delete(Key: string) {
    await r2.send(new DeleteObjectCommand({ Bucket: env.R2_BUCKET_NAME, Key }));
  }

  static async deleteMany(keys: string[]) {
    if (keys.length === 0) return;

    // Maax: 1000 keys
    const Objects = keys.map((Key) => ({ Key }));
    await r2.send(new DeleteObjectsCommand({ Bucket: env.R2_BUCKET_NAME, Delete: { Objects } }));
  }

  static async list(Prefix: string) {
    // Maax: 1000 keys
    const res = await r2.send(new ListObjectsV2Command({ Bucket: env.R2_BUCKET_NAME, Prefix }));

    if (!res.Contents) return [];

    const keys: string[] = [];
    for (const item of res.Contents) {
      if (item.Key) keys.push(item.Key);
    }
    return keys;
  }
}
