'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import loadJsConfig from "next/dist/build/load-jsconfig"

export type PricingTemplatePayload = Prisma.PricingTemplateUncheckedCreateInput

export const createPricingTemplate = async (data: PricingTemplatePayload) => {

    const response = await prisma.pricingTemplate.create({
        data,
    });

    return response

}
