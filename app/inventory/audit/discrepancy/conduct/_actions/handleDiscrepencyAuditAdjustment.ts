'use server'

import { getUserId } from "@/actions/users/getUserId"
import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma";


const { adjustmentRemove, adjustmentAddition } = staticRecords.inventory.transactionTypes;

export const handleDiscrepancyAuditAdjustment = async (itemId: string, newQuantity: number, currentQuantity: number, lotId: string) => {


    const userId = await getUserId()

    const transactionTypeId =
        newQuantity - currentQuantity < 0
            ? adjustmentRemove
            : adjustmentAddition
    const adjustmentQuantity = Math.abs(newQuantity - currentQuantity)



    const transaction = await prisma.transaction.create({
        data: {
            transactionTypeId,
            amount: adjustmentQuantity,
            userId,
            systemNote: `Discrepancy Audit Item Adjustment`,
            userNote: '',
            uomId: staticRecords.inventory.uom.lb,
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
