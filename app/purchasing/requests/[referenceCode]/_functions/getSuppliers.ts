"use server"

import prisma from "@/lib/prisma"

export const getSuppliers = async () => {

    const suppliers = await prisma.supplier.findMany({
        orderBy: {
            name: 'asc'
        },
    });

    return suppliers;
}


export type RequestSupplier = Awaited<ReturnType<typeof getSuppliers>>[number]
