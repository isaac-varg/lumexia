"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createGenericUnitConversionFactor = async (data: Prisma.GenericUnitConversionFactorUncheckedCreateInput) => {

    const res = await prisma.genericUnitConversionFactor.create({
        data,
    })

    return res
}
