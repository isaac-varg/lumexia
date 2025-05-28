"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"


export const createQcTemplate = async (data: Prisma.QcTemplateUncheckedCreateInput) => {
    const resp = await prisma.qcTemplate.create({
        data,
    });

    return resp
}
