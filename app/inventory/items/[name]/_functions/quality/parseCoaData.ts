'use server'

import { gemini } from "@/lib/ai";
import { Type } from "@google/genai";
import { Buffer } from 'buffer';
import { type } from "os";

const prompt = "Extract from the PDF the listed parameters used to conduct quality control. For each parameter inclue the name of the parameter, the unit of measurement, result value, and specification (range, min or maximum). For Return the data in a structured JavaScript object."

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
            model: 'gemini-2.5-flash-preview-04-17',
            contents: contents,
            config: {
                temperature: 0,
                responseMimeType: "application/json",
                thinkingConfig: {
                    thinkingBudget: 1500,
                },
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: {
                                type: Type.STRING
                            },
                            unitOfMeasurement: {
                                type: Type.STRING
                            },
                            resultValue: {
                                type: Type.STRING

                            },
                            specification: {
                                type: Type.STRING
                            }
                        }
                    }
                },
            }
        });

        const responseText = response.text
        return responseText
    } catch (error) {
        console.error(error)
    }
};
