'use server'

import { getUserId } from "@/actions/users/getUserId"
import { transactionTypes } from "@/configs/staticRecords/transactionTypes";
import { uom } from "@/configs/staticRecords/unitsOfMeasurement";
import prisma from "@/lib/prisma";


const { adjustmentRemoval, adjustmentAddition } = transactionTypes;

export const handleDiscrepancyAuditAdjustment = async (itemId: string, newQuantity: number, currentQuantity: number, lotId: string) => {


  const userId = await getUserId()

  const transactionTypeId =
    newQuantity - currentQuantity < 0
      ? adjustmentRemoval
      : adjustmentAddition
  const adjustmentQuantity = Math.abs(newQuantity - currentQuantity)



  const transaction = await prisma.transaction.create({
    data: {
      transactionTypeId,
      amount: adjustmentQuantity,
      userId,
      systemNote: `Discrepancy Audit Item Adjustment`,
      userNote: '',
      uomId: uom.pounds,
      lotId,
    }
  });


  const auditItemTransaction = await prisma.discrepancyAuditItemTransaction.create({
    data: {
      auditItemId: itemId,
      transactionId: transaction.id
    }
  });

  return auditItemTransaction;

} 
