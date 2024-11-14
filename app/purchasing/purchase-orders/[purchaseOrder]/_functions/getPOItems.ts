"use server"

import prisma from "@/lib/prisma"

export const getPOItems = async (purchaseOrderId: string) => {

    // get the items
    const items = await prisma.purchaseOrderItem.findMany({
        where: {
            purchaseOrderId,
        },
        include: {
            item: true,
            uom: true,
            purchaseOrderStatus: true,
            purchaseOrders: true
        }
    });


    // determine if matching aliases exists

    const aliases = await Promise.all(items.map(async (item) => {

        const matchingAlias = await prisma.supplierAlias.findFirst({
            where: {
                supplierId: item.purchaseOrders.supplierId,
                alias: {
                    itemId: item.itemId,
                }
            },
            include: {
                alias: true,
            },
        })

        return {
            ...item,
            alias: matchingAlias,
        }
    }));



    return aliases      

}
