"use server"

import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma";
import { getConversionFactor } from "@/utils/uom/getConversionFactor";
import { toInventoryUom } from "@/utils/uom/toInventoryUom";

export const getPurchaseOrders = async (itemId: string) => {
    const purchaseOrders = await prisma.purchaseOrder.findMany({
        where: {
            purchaseOrderItems: {
                some: {
                    itemId,
                },
            },
        },
        include: {
            supplier: true,
            user: true,
            status: true,
            paymentMethod: true,
            purchaseOrderItems: true,
        },
    });

    const convertedPurchaseOrders = await Promise.all(purchaseOrders.map( async (po) => {

        if (po.purchaseOrderItems.every((item) => item.uomId === staticRecords.inventory.uom.lb)) {
            return { ...po }
        }

        const poItems = await Promise.all(po.purchaseOrderItems.map(async (item) => {

            let quantity = item.quantity;
            let price = item.pricePerUnit


            if (item.itemId !== itemId) {
                
                return { ...item }
            }


            if (item.uomId !== staticRecords.inventory.uom.lb) {
                const conversionFactor = await getConversionFactor(item.uomId, staticRecords.inventory.uom.lb)
                const convertedQuantity = await toInventoryUom(item.uomId, item.quantity);
                const convertedPrice = item.pricePerUnit / conversionFactor;
                quantity = convertedQuantity;
                price = convertedPrice;
            }

            return {
                ...item,
                pricePerUnit: price,
                quantity,
            }
        }));

        return {
            ...po,
            purchaseOrderItems: poItems,
        }
    }))


    return convertedPurchaseOrders;
}
