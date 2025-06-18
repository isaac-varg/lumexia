"use server"

import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma"

const { delivered, requestCancelledDuplicateRequest, discontinuedIngredient } = staticRecords.purchasing.requestStatuses;

export const getRequests = async () => {
    const requests = await prisma.purchasingRequest.findMany({
        where: {
            statusId: {
                notIn: [
                    delivered,
                    requestCancelledDuplicateRequest,
                    discontinuedIngredient,
                ]
            }
        },
        include: {
            item: true,
            status: true,
            priority: true,
            pos: {
                include: {
                    po: {
                        include: {
                            supplier: true,
                            purchaseOrderItems: {
                                include: {
                                    purchaseOrderStatus: true,
                                    details: true
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });

    const workedUp = requests.map((r) => {
        const relevantPoItems = r.pos.length > 0 ? r.pos[0].po.purchaseOrderItems.filter((i) => i.itemId === r.itemId) : null;

        const uniquePoSuppliers = r.pos.reduce((acc: any, item) => {
            if (!acc.includes(item.po.supplier.name)) {
                acc.push(item.po.supplier.name);
            }
            return acc;
        }, []);

        return ({
            ...r,
            requestedItemName: r.item.name,
            statusName: r.status.name,
            priorityName: r.priority.name,
            relevantPoItems,
            connectedPoSuppliers: uniquePoSuppliers
        })
    })


    return workedUp
}


export type RequestForDashboard = Awaited<ReturnType<typeof getRequests>>[number]

// alias for some other types I made to match the one above 
export type IPurchasingRequest = RequestForDashboard

