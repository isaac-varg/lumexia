"use server";

import prisma from "@/lib/prisma";

export const getLotsByItem = async (itemId: string) => {
    const results = await prisma.lot.findMany({
        where: { itemId }, // Simplified where clause
        include: {
            item: true,
            containers: {
                include: { containerType: true, lot: true, uom: true },
            },
            uom: true,
            transactions: { include: { transactionType: true, unitOfMeasurement: true, user: true } },
        },
    });

    const lotsWithTotals = results.map((lot) => {
        const totalTransactionAmount = lot.transactions.reduce(
            (acc, transaction) =>
                acc + (transaction.transactionType.deduction ? -transaction.amount : transaction.amount),
            0
        );

        return {
            ...lot,
            totalQuantityOnHand: lot.initialQuantity + totalTransactionAmount,
            totalTransactionAmount,
        };
    });

    return lotsWithTotals;
};

export type InventoryLot = Awaited<ReturnType<typeof getLotsByItem>>[number]


