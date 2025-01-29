"use server"

import prisma from "@/lib/prisma"

export const getRequests = async () => {
    const requests = await prisma.purchasingRequest.findMany({
        include: {
            item: true,
            status: true,
            priority: true,
            pos: {
                include: {
                    po: {
                        include: {
                            purchaseOrderItems: {
                                include: {
                                    details: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    const workedUp = requests.map((r) => {
        return ({
            ...r,
            requestedItemName: r.item.name,
            statusName: r.status.name,
            priorityName: r.priority.name,
        })
    })


    return workedUp 
}


export type RequestForDashboard =  Awaited<ReturnType<typeof getRequests>>[number]

// alias for some other types I made to match the one above 
export type IPurchasingRequest = RequestForDashboard

