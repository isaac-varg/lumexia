"use server"

import prisma from "@/lib/prisma"

export const inflateTemplateParameters = async (itemId: string, templateId: string) => {

    const parameters = await prisma.qcTemplateParameter.findMany({
        where: {
            templateId,
        }
    });


    const payload = parameters.map((p) => {
        return {
            itemId,
            parameterId: p.parameterId,
        }
    })

    const response = await prisma.qcItemParameter.createMany({
        data: [...payload]
    });

    return response

}
