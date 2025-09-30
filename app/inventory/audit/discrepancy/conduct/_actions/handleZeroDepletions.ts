'use server'

import prisma from "@/lib/prisma"
import { DiscrepancyItem } from "./getDiscrepancyItem"
import { getUserId } from "@/actions/users/getUserId"
import { staticRecords } from "@/configs/staticRecords"
import { transactionTypes } from "@/configs/staticRecords/transactionTypes"

export const handleZeroDepletions = async (lots: DiscrepancyItem['lots'], itemId: string) => {

  const userId = await getUserId()
  const { adjustmentAddition } = transactionTypes

  const responses = await Promise.all(lots.map(async (lot) => {
    const currentQuantity = Math.abs(lot.totalQuantityOnHand);

    const transaction = await prisma.transaction.create({
      data: {
        transactionTypeId: adjustmentAddition,
        amount: currentQuantity,
        userId,
        systemNote: `Discrepancy Audit Item Adjustment via Zero Depletion Bulk Action`,
        userNote: '',
        uomId: staticRecords.inventory.uom.lb,
        lotId: lot.id,
      }
    });


    const auditItemTransaction = await prisma.discrepancyAuditItemTransaction.create({
      data: {
        auditItemId: itemId,
        transactionId: transaction.id
      }
    });

  }))

  return responses;

}
