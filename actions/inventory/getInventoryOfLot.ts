"use server"

import prisma from "@/lib/prisma";

export const getInventoryOfLot = async (id: string) => {

    // get the lot data including transactions
    const lot = await prisma.lot.findUniqueOrThrow({
        where: {
            id
        },
        include: {
            item: true,
            containers: {
                include: { containerType: true, lot: true, uom: true },
            },
            uom: true,
            transactions: { include: { transactionType: true, unitOfMeasurement: true, user: true } },
        },
    });

    // reduce / sum the transaction amounts
    const totalTransactionAmount = lot.transactions.reduce(
        (acc, transaction) =>
            acc + (transaction.transactionType.deduction ? -transaction.amount : transaction.amount),
        0
    );

    // make an inventory object to reference
    const inventory = {
        ...lot,
        totalQuantityOnHand: lot.initialQuantity + totalTransactionAmount,
        totalTransactionAmount,
    };


    return inventory;

}

export type InventoryOfLot = Awaited<ReturnType<typeof getInventoryOfLot>>
