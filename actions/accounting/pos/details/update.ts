"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updatePoAccountingDetails = async (id: string, data: Prisma.PoAccountingDetailUncheckedUpdateInput) => {

    const res = await prisma.poAccountingDetail.update({
        where: {
            id,
        },
        data,
    });

    return res
};
