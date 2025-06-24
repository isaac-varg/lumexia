'use server'

import prisma from "@/lib/prisma"

export const getAllSuppliers = async () => {
    const suppliers = await prisma.supplier.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    return suppliers 
}

export type Supplier = Awaited<ReturnType<typeof getAllSuppliers>>[number]
