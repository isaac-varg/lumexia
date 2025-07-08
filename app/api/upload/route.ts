import { NextRequest, NextResponse } from 'next/server';
import { s3 } from '@/lib/s3';
import { Buffer } from 'buffer';
import { randomUUID } from 'crypto';
import path from 'path';
import { getUserId } from '@/actions/users/getUserId';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const pathPrefix = formData.get('pathPrefix') as string | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
        }

        if (!pathPrefix) {
            return NextResponse.json({ error: 'No path prefix specified.' }, { status: 400 })
        }

        const bucketName = process.env.S3_BUCKET_NAME!;
        if (!bucketName) {
            throw new Error("S3_BUCKET_NAME environment variable is not set.");
        }

        // TODO ensure that bucket exists on app startup not every time we upload
        const bucketExists = await s3.bucketExists(bucketName);
        if (!bucketExists) {
            await s3.makeBucket(bucketName);
            console.log(`Bucket ${bucketName} created.`);
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileExtension = path.extname(file.name);
        const objectName = `${pathPrefix}/${randomUUID()}${fileExtension}`;

        const metaData = {
            'Content-Type': file.type,
        };

        const uploadInfo = await s3.putObject(bucketName, objectName, buffer, file.size, metaData);

        // create the response rather than provide just upload info
        const responseData = {
            name: file.name,
            mimetype: file.type,
            size: file.size,
            bucket: bucketName,
            objectName: objectName,
            etag: uploadInfo.etag,
            versionId: uploadInfo.versionId,
        };


        // handle posting to our db
        const userId = await getUserId();
        await prisma.file.create({
            data: {
                name: responseData.name,
                objectName: responseData.objectName,
                bucketName: responseData.bucket,
                etag: responseData.etag,
                versionId: responseData.versionId,
                size: responseData.size,
                mimeType: responseData.mimetype,
                uploadedById: userId,
            }
        });

        return NextResponse.json(responseData, { status: 200 });

    } catch (error) {
        console.error('Upload failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: 'Failed to upload file.', details: errorMessage }, { status: 500 });
    }
}
