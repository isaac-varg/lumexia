"use server";

import prisma from "@/lib/prisma";

export const getLotsByItem = async (itemId: string) => {
  const results = await prisma.lot.findMany({
    where: { itemId }, // Simplified where clause
    include: {
      item: true,
      uom: true,
      transactions: { include: { transactionType: true, unitOfMeasurement: true, user: true } },
      lotOrigin: {
        include: {
          bpr: true,
          purchaseOrder: true,
        }
      },
    },
  });

  const lotsWithTotals = results.map((lot) => {
    const totalTransactionAmount = lot.transactions.reduce(
      (acc, transaction) =>
        acc + (transaction.transactionType.deduction ? -transaction.amount : transaction.amount),
      0
    );

    const totalQuantityOnHand = lot.initialQuantity + totalTransactionAmount;
    const isDepleted = totalQuantityOnHand === 0;

    return {
      ...lot,
      isDepleted,
      totalQuantityOnHand,
      totalTransactionAmount,
    };
  });

  return lotsWithTotals;
};

export type InventoryLot = Awaited<ReturnType<typeof getLotsByItem>>[number]


