'use server'

import prisma from "@/lib/prisma"
import { DiscrepancyItem } from "./getDiscrepancyItem"
import { createNote } from "./createNote"
import { getUserId } from "@/actions/users/getUserId"
import { getUser } from "@/actions/users/getUser"
import { discrepancyAuditItemStatuses } from "@/configs/staticRecords/discrepancyAuditItemStatuses"
import { discrepancyAuditItemNoteTypes } from "@/configs/staticRecords/discrepancyAuditItemNoteTypes"
import { users } from "@/configs/staticRecords/users"

export const completeAuditItem = async (discrepancyItem: DiscrepancyItem) => {

  const user = await getUser()

  // change status
  const response = await prisma.discrepancyAuditItem.update({
    where: {
      id: discrepancyItem.id,
    },
    data: {
      statusId: discrepancyAuditItemStatuses.audited,
    }
  })


  // make a note
  await createNote({
    auditItemId: discrepancyItem.id,
    userId: users.lumexia,
    noteTypeId: discrepancyAuditItemNoteTypes.automated,
    content: `${user.name} completed the audit of the ${discrepancyItem.item.name}`
  });

  return response;
}
