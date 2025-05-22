'use server'

import { gemini } from "@/lib/ai";
import { Type } from "@google/genai";

export const testOutput = async () => {


    const response = await gemini.models.generateContent({
        model: "gemini-2.0-flash",
        contents:
            "List a few popular cookie recipes, and include the amounts of ingredients.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        recipeName: {
                            type: Type.STRING,
                        },
                        ingredients: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            },
                        },
                    },
                    propertyOrdering: ["recipeName", "ingredients"],
                },
            },
        },
    });

    return response.text
}
