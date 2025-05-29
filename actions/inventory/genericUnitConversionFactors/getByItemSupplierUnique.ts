"use server"

import prisma from "@/lib/prisma"

export const getConversionByItemSupplierUnique = async (itemId: string, supplierId: string) => {

    const conversion = prisma.genericUnitConversionFactor.findUnique({
        where: {
            item_supplier_unique: {
                itemId,
                supplierId,
            }
        },
        include: {
            convertToUom: true
        }
    })

    return conversion

}

export type GenericUnitConversionFactor = Awaited<ReturnType<typeof getConversionByItemSupplierUnique>>
