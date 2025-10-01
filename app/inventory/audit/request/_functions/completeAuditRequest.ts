"use server"

import { getUserId } from "@/actions/users/getUserId"
import { staticRecords } from "@/configs/staticRecords";
import { auditRequestNoteTypes } from "@/configs/staticRecords/auditRequestNoteTypes";
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";


export const completeAuditRequest = async (requestId: string, itemId: string) => {
  const userId = await getUserId();
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  // create the inventory audit entry
  const response = await prisma.inventoryAudit.create({
    data: {
      itemId,
      conductedById: userId,
    },
  });

  // make an automated note
  await prisma.auditRequestNote.create({
    data: {
      requestId,
      noteTypeId: auditRequestNoteTypes.automated,
      userId,
      content: `${user.name} Completed the Audit Request.`,
    },
  });

  // update the request
  //

  const update = await prisma.auditRequest.update({
    where: {
      id: requestId,
    },
    data: {
      statusId: 'e90cbff4-a490-460e-af62-d72fe78710eb',
      inventoryAuditId: response.id,
    },
  });

  // revalidate the path
  revalidatePath('/inventory/audit');
  return update

};

