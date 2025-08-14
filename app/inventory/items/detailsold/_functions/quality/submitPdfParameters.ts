"use server"

import prisma from "@/lib/prisma"
import { RecognizedCoaData } from "../../_components/quality/AiEntry"

// creates the parameters and links them to the item

export const submitPdfParameters = async (data: RecognizedCoaData[], itemId: string) => {

    const responses = await Promise.all(data.map(async (d) => {

        const parameter = await prisma.qcParameter.create({
            data: {
                name: d.name,
                uom: d.unitOfMeasurement,
                dataType: 'string',
                isWetParameter: false,
            }
        });

        const itemParameter = await prisma.qcItemParameter.create({
            data: {
                itemId,
                parameterId: parameter.id,
                specification: {
                    value: d.specification,
                    unitOfMeasurement: d.unitOfMeasurement,
                }
            }
        });

        return itemParameter;

    }));

    return responses;
}
