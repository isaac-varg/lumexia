'use server'

import prisma from "@/lib/prisma"
import { DiscrepancyItem } from "./getDiscrepancyItem"
import { getUser } from "@/actions/users/getUser"
import { discrepancyAuditStatuses } from "@/configs/staticRecords/discrepancyAuditStatuses"
import { discrepancyAuditItemStatuses } from "@/configs/staticRecords/discrepancyAuditItemStatuses"
import { discrepancyAuditItemNoteTypes } from "@/configs/staticRecords/discrepancyAuditItemNoteTypes"
import { users } from "@/configs/staticRecords/users"

export const completeDiscrepancyAudit = async (auditId: string, incompletedItems: DiscrepancyItem[]) => {

  // change the status of the audit
  const response = await prisma.discrepancyAudit.update({
    where: {
      id: auditId,
    },
    data: {
      statusId: discrepancyAuditStatuses.closed,
    }
  });

  // handle incomplete items
  const items = await Promise.all(incompletedItems.map(async (item) => {


    const user = await getUser()
    // make incomplete notes on audit item
    await prisma.discrepancyAuditItemNote.create({
      data: {
        auditItemId: item.id,
        noteTypeId: discrepancyAuditItemNoteTypes.automated,
        userId: users.lumexia,
        content: `This item had a status of incomplete when the the discrepnacy audit was closed by ${user.name}`
      }
    })
    // change audit item statuses
    const response = await prisma.discrepancyAuditItem.update({
      where: {
        id: item.id,
      },
      data: {
        statusId: discrepancyAuditItemStatuses.incomplete,
      }
    })

    return response

  }));

  return response;
}
