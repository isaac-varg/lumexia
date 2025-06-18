"use server"

import prisma from "@/lib/prisma"


export const getAllQcRecordsByBpr = async (bprId: string) => {

    const records = await prisma.qcRecord.findMany({
        where: {
            linkedBprId: bprId,
        },
        include: {
            conductedBy: true,
            status: true,
            examinationType: true,
            examinedLot: {
                include: {
                    item: true,
                    lotOrigin: {
                        include: {
                            bpr: true,
                            purchaseOrder: true,
                        }
                    }
                },
            },
            linkedBpr: true,
            linkedPurchaseOrderItem: true,
        }
    });

    return records
}

