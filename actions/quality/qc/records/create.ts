'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createQcRecord = async (data: Prisma.QcRecordUncheckedCreateInput) => {
    const response = await prisma.qcRecord.create({
        data,
    });

    return response
};
