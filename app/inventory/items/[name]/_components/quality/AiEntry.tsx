// AiEntry.tsx
import Card from "@/components/Card";
import { parseCoaData } from "../../_functions/quality/parseCoaData";
import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import AiEntrySubmission from "./AiEntrySubmission";

//export interface RecognizedCoaData {
//    [key: string]: any;
//}

export type RecognizedCoaData = {
    name: string
    unitOfMeasurement: string
    resultValue: string
    specification: string
}

const AiEntry = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [recognizedData, setRecognizedData] = useState<RecognizedCoaData[] | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
        setLoading(true);
        setError(null);
        setRecognizedData(null);

        if (fileRejections.length > 0) {
            const rejectedFileNames = fileRejections.map((fr) => fr.file.name).join(", ");
            setError(`Some files were rejected: ${rejectedFileNames}. Please check file types/sizes.`);
            setLoading(false);
            return;
        }

        if (acceptedFiles.length === 0) {
            setError("Please drop a file.");
            setLoading(false);
            return;
        }

        try {
            const processedResults: RecognizedCoaData[] = [];
            for (const file of acceptedFiles) {
                const typedFile: File = file;

                const reader = new FileReader();

                const fileArrayBuffer: ArrayBuffer = await new Promise((resolve, reject) => {
                    reader.onabort = () => {
                        console.log("file reading was aborted");
                        reject(new Error("File reading aborted"));
                    };
                    reader.onerror = () => {
                        console.log("file reading has failed");
                        reject(new Error("File reading failed"));
                    };
                    reader.onload = () => {
                        if (reader.result instanceof ArrayBuffer) {
                            resolve(reader.result);
                        } else {
                            reject(new Error("FileReader did not return an ArrayBuffer."));
                        }
                    };
                    reader.readAsArrayBuffer(typedFile);
                });

                const base64String = btoa(
                    new Uint8Array(fileArrayBuffer).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                    )
                );

                const result = await parseCoaData(base64String, typedFile.type)
                if (!result) return;
                processedResults.push(JSON.parse(result));
            }

            setRecognizedData(processedResults);
        } catch (err: any) {
            console.error("Error processing files:", err);
            setError(`Error processing files: ${err.message || "An unknown error occurred."}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "image/jpeg": [".jpeg", ".jpg"],
            "image/png": [".png"],
        },
        maxFiles: 5,
        maxSize: 10 * 1024 * 1024,
        multiple: true,
    });

    return (
        <div>

            {!recognizedData && (<div>

                <div
                    {...getRootProps()}
                    className={`
          mt-4 p-6 border-2 border-dashed rounded-lg text-center
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}
          cursor-pointer transition-colors duration-200 ease-in-out
        `}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag n drop some files here, or click to select files</p>
                    )}
                </div>

                {loading && <p className="mt-4 text-blue-600">Processing files...</p>}
                {error && <p className="mt-4 text-red-600">Error: {error}</p>}

            </div>
            )}

            {recognizedData && recognizedData.length > 0 && (
                <AiEntrySubmission data={recognizedData} />
            )}



        </div>
    );
};

export default AiEntry;
