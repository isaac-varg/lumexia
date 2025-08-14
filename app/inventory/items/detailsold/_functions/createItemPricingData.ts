'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { table } from "console"

export const createItemPricingData = async (data: Prisma.ItemPricingDataUncheckedCreateInput) => {

    const response = await prisma.itemPricingData.create({
        data,
    })

    return response;
}
