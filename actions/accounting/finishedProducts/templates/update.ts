'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { format } from "path"


export const updatePricingTemplate = async (id: string, payload: Prisma.PricingTemplateUncheckedUpdateInput) => {

    const res = await prisma.pricingTemplate.update({
        where: {
            id,
        },
        data: payload
    });

    return res
}
