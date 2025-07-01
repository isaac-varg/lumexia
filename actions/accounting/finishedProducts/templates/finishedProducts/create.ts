'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export type PricingTemplateFinishedProductPayload = Prisma.PricingTemplateFinishedProductUncheckedCreateInput

export const createPricingTemplateFinishedProduct = async (data: PricingTemplateFinishedProductPayload) => {
    const response = await prisma.pricingTemplateFinishedProduct.create({
        data,
    });

    return response

}




