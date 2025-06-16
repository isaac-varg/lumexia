'use server'

import prisma from "@/lib/prisma";

export const getSingleQcExamination = async (qcExaminId: string) => {
    const exam = await prisma.qcRecord.findUnique({
        where: {
            id: qcExaminId,
        },
        include: {
            conductedBy: true,
            status: true,
            examinationType: true,
            examinedLot: {
                include: {
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

    return exam;
}


