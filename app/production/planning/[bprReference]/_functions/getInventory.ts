
"use server"

import { getLotsByItem } from "@/actions/auxiliary/getLotsByItem"
import { BprBom, ExBprBom } from "@/types/bprBom"
import prisma from "@/lib/prisma"




export const getInventory = async (bom: ExBprBom[]) => {
    const data = await Promise.all(bom.map(async (material: ExBprBom) => {
        const lots = await getLotsByItem(material.bom.itemId)

        const allocated = await prisma.bprBillOfMaterials.findMany({
            where: {
                bom: {
                    itemId: material.bom.item.id,
                },
                bprId: {
                    not: material.bpr.id
                }
            },
            include: {
                bpr: {
                    include: {
                        mbpr: {
                            include: {
                                producesItem: true,
                            }
                        },
                        status: true
                    }
                },
                bom: true,
                uom: true,
            }
        })



        const purchases = await prisma.purchaseOrderItem.findMany({
            where: {
                itemId: material.bom.item.id,
            },
            orderBy: {
                purchaseOrders: {
                    referenceCode: 'desc',
                },
            },
            include: {
                purchaseOrders: {
                    include: {
                        status: true
                    }
                },
                purchaseOrderStatus: true
            },
            take: 5
        })



        const totalOnHand = lots.reduce(
            (accumulator: number, current: any) => accumulator + current.totalQuantityOnHand, 0
        );

        const totalQuantityAllocated = allocated.reduce((accumulator: number, current: any) => accumulator + current.quantity, 0)

        const totalQuantityAvailable = totalOnHand - totalQuantityAllocated;

        return {
            ...material,
            totalQuantityOnHand: totalOnHand,
            allocated,
            totalQuantityAllocated,
            totalQuantityAvailable,
            purchases,
        }
    }))

    return data
}


//const getAllocations = async ()

