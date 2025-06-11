import * as Minio from 'minio'

const port: number = process.env.S3_PORT ? parseInt(process.env.S3_PORT) : 9000

export const s3 = new Minio.Client({
    endPoint: process.env.S3_END_POINT || "",
    port: port,
    useSSL: false,
    accessKey: process.env.S3_ACCESS_KEY,
    secretKey: process.env.S3_SECRET_KEY,
});
