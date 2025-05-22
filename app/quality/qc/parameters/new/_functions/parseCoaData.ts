'use server'

import { gemini } from "@/lib/ai";
import { Type } from "@google/genai";
import { Buffer } from 'buffer';

const prompt = "Extract key information from this document, such as product name, lot number, and any other relevant analytical data. Return the data in a structured JavaScript object. For each analytical data provide name, uom, date type, and specification. If no data is found, return an empty JavaScript object."

interface RecognizedCoaData {
    [key: string]: any;
}

export const parseCoaData = async (
    base64Data: string,
    mimeType: string
) => {

    if (!base64Data) {
        throw new Error("No base64 data provided to parseCoaData.");
    }
    if (!mimeType) {
        throw new Error("No MIME type provided for the file.");
    }

    try {

        const fileBuffer = Buffer.from(base64Data, 'base64');

        const contents = [
            { text: prompt },

            {
                inlineData: {
                    mimeType: mimeType,
                    data: fileBuffer.toString("base64")
                }
            }
        ];

        const response = await gemini.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        data: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    itemName: {
                                        type: Type.STRING,
                                    },
                                    parameters: {
                                        type: Type.ARRAY,
                                        items: {
                                            type: Type.OBJECT,
                                            properties: {
                                                parameterName: {
                                                    type: Type.STRING,
                                                },
                                                uom: {
                                                    type: Type.STRING,
                                                },
                                                dataType: {
                                                    type: Type.STRING,
                                                },
                                                specification: {
                                                    type: Type.STRING,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }
        });

        const responseText = response.text
        return responseText
    } catch (error) {
        console.error(error)
    }
};
