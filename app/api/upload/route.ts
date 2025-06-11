import { NextRequest, NextResponse } from 'next/server';
import { s3 } from '@/lib/s3'; // Adjust path if necessary
import { Buffer } from 'buffer';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
        }

        const bucketName = process.env.S3_BUCKET_NAME!;
        if (!bucketName) {
            throw new Error("MINIO_BUCKET environment variable is not set.");
        }

        // Check if the bucket exists, and create it if it doesn't.
        const bucketExists = await s3.bucketExists(bucketName);
        if (!bucketExists) {
            await s3.makeBucket(bucketName);
            console.log(`Bucket ${bucketName} created.`);
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create a unique object name
        const objectName = `${Date.now()}-${file.name}`;

        // Define metadata for the object
        const metaData = {
            'Content-Type': file.type,
        };

        // Upload the file to MinIO
        await s3.putObject(bucketName, objectName, buffer, undefined, metaData);

        // Construct the file URL
        const fileUrl = `${process.env.S3_END_POINT}:${process.env.S3_PORT}/${bucketName}/${objectName}`;

        // Save the image metadata to the database
        //  const savedImage = await prisma.image.create({
        //      data: {
        //          fileName: file.name,
        //          url: fileUrl,
        //          size: file.size,
        //      },
        //  });

        return NextResponse.json({ status: 200 });
        //        return NextResponse.json(savedImage, { status: 200 });

    } catch (error) {
        console.error('Upload failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: 'Failed to upload file.', details: errorMessage }, { status: 500 });
    }
}
