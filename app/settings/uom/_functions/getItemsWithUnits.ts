'use server'

import { inventoryActions } from "@/actions/inventory";
import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma";


export const getItemsWithUnits = async () => {

    const uniqueItems = await prisma.item.findMany({
        where: {
            purchaseOrderItem: {
                some: {
                    uomId: staticRecords.inventory.uom.units,
                }
            }
        },
        include: {
            purchaseOrderItem: {
                include: {
                    purchaseOrders: {
                        include: {
                            supplier: true
                        }
                    }
                }
            }
        }

    })


    const withConversion = await Promise.all(uniqueItems.map(async (i) => {

        const conversion = await inventoryActions.genericUnitsConversion.getBySupplierItemUnique(i.id, i.purchaseOrderItem[0].purchaseOrders.supplierId);

        return {
            ...i,
            associatedSupplier: i.purchaseOrderItem[0].purchaseOrders.supplier.name,
            genericUnitConversion: conversion ? { ...conversion } : null,
        }
    }))

    return withConversion

}

export type ItemWithGenericUnits = Awaited<ReturnType<typeof getItemsWithUnits>>[number];
