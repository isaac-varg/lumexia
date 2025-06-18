"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createQcParameterGroup = async (data: Prisma.QcParameterGroupUncheckedCreateInput) => {
    const res = await prisma.qcParameterGroup.create({
        data,
    });

    return res
}
