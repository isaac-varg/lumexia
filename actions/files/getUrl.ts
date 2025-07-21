"use server"

import { s3 } from "@/lib/s3";

// gets presigned url
export const getFileUrl = async (bucketName: string, objectName: string) => {

    const url = await s3.presignedGetObject(
        bucketName,
        objectName,
        3600
    );


    return url
}
