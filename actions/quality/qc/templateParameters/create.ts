'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createTemplateParameter = async (data: Prisma.QcTemplateParameterUncheckedCreateInput) => {
    const res = await prisma.qcTemplateParameter.create({
        data,
    });

    return res
};
