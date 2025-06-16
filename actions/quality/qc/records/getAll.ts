"use server"

import prisma from "@/lib/prisma"

// stupid naming.. team calls records examinations
export const getAllQcExaminations = async () => {
    const exams = await prisma.qcRecord.findMany({
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

    return exams;
}

export type QcExamination = Awaited<ReturnType<typeof getAllQcExaminations>>[number];


