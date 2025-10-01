"use server"

import { getUserId } from "@/actions/users/getUserId"
import { staticRecords } from "@/configs/staticRecords";
import { auditRequestNoteTypes } from "@/configs/staticRecords/auditRequestNoteTypes";
import prisma from "@/lib/prisma"

export const createOpenedNote = async (requestId: string) => {

  const userId = await getUserId();
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    }
  });

  const response = await prisma.auditRequestNote.create({
    data: {
      userId,
      requestId,
      noteTypeId: auditRequestNoteTypes.automated,
      content: `${user.name} opened this audit request.`
    }
  })

  return response

}
