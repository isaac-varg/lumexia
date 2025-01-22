"use server"

import prisma from "@/lib/prisma"

export const getPurchaseOrder = async (id: string) => {

    const po = await prisma.purchaseOrder.findFirstOrThrow({
        where: {
            id,
        },
        include: {
            supplier: true,
            user: true,
            status: true,
            paymentMethod: true
        }
    });

    return po;
};

export type PurchaseOrderDetails = Awaited<ReturnType<typeof getPurchaseOrder>>;
