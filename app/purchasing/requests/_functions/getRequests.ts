"use server"

import prisma from "@/lib/prisma"
import { Item } from "@/types/item";
import { PurchasingRequest } from "@/types/purchasingRequest";
import { RequestPriority } from "@/types/requestPriority";
import { RequestStatus } from "@/types/requestStatus";

export interface IPurchasingRequest extends PurchasingRequest {
    item: Item
    status: RequestStatus
    priority: RequestPriority
    requestedItemName: string
    statusName: string
    priorityName: string
}

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
