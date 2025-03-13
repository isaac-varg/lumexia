'use server'
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createItemPricingDataArchive = async (data: Prisma.ItemPricingDataArchiveUncheckedCreateInput) => {

    const response = await prisma.itemPricingDataArchive.create({
        data,
    })

    return response;
}

export type ItemPricingDataArchivePayload = Prisma.ItemPricingDataArchiveUncheckedCreateInput
