'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export type PricingTemplateAuxiliaryPayload = Prisma.PricingTemplateAuxiliaryUncheckedCreateInput
export const createPricingTemplateAuxiliaries = async (data: PricingTemplateAuxiliaryPayload) => {
    const response = await prisma.pricingTemplateAuxiliary.create({
        data,
    })

    return response
}
