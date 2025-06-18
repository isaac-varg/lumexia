'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createQcGroupParameter = async (data: Prisma.QcGroupParameterUncheckedCreateInput) => {
    const res = await prisma.qcGroupParameter.create({
        data,
    });

    return res
}


