'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateTemplateFinishedProduct = async (id: string, payload: Prisma.PricingTemplateFinishedProductUncheckedUpdateInput) => {
    const res = await prisma.pricingTemplateFinishedProduct.update({
        where: {
            id,
        },
        data: payload,
    })
    return res;
}
