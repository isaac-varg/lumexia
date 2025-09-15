'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { TbCheck, TbPhoto, TbX } from 'react-icons/tb';

type UploadProps = {
    pathPrefix?: string;
}

const ImageUpload = ({ pathPrefix = 'general' }: UploadProps) => {

    const [uploadedFile, setUploadedFile] = useState<{
        fileName: string;
        url: string;
    } | null>(null);

    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setIsUploading(true);
        setError(null);
        setUploadedFile(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('pathPrefix', pathPrefix);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const data = await response.json();
            console.log('data', data)
            setUploadedFile({ fileName: data.fileName, url: data.url });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsUploading(false);
        }
    }, [pathPrefix]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
            'application/pdf': ['.pdf']
        },
        multiple: false,
    });

    return (
        <div className="w-full max-w-lg mx-auto p-4">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                    }`}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center">
                    <TbPhoto className="w-12 h-12 text-gray-400 mb-4" />
                    {isDragActive ? (
                        <p className="text-gray-600">Drop the image here ...</p>
                    ) : (
                        <p className="text-gray-600">Drag & drop an image or pdf here, or click to select one</p>
                    )}
                </div>
            </div>
            {isUploading && (
                <div className="mt-4 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="ml-2 text-gray-700">Uploading...</p>
                </div>
            )}
            {error && (
                <div className="mt-4 flex items-center text-red-600 bg-red-50 p-3 rounded-lg">
                    <TbX className="w-5 h-5 mr-2 shrink-0" />
                    <p>{error}</p>
                </div>
            )}
            {uploadedFile && (
                <div className="mt-4 p-4 border rounded-lg bg-green-50 border-green-200">
                    <div className="flex items-center text-green-800">
                        <TbCheck className="w-5 h-5 mr-2 shrink-0" />
                        <p className="font-semibold">Upload successful!</p>
                    </div>
                    <div className="mt-2 pl-7 text-sm text-gray-700">
                        <p className="truncate"><strong>File:</strong> {uploadedFile.fileName}</p>
                        <a
                            href={uploadedFile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            View Uploaded Image
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
