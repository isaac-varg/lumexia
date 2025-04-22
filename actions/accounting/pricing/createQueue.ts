"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createPricingQueue = async (data: Prisma.PricingQueueUncheckedCreateInput) => {

    const response = await prisma.pricingQueue.create({
        data,
    });

    return response
};
