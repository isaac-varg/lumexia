'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createPoAccountingDetail = async (data: Prisma.PoAccountingDetailUncheckedCreateInput) => {
    const res = await prisma.poAccountingDetail.create({
        data,
    });

    return res
};
