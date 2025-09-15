'use server'

import prisma from "@/lib/prisma"

export const getAllPoPublicNoteTypes = async () => {
  const types = await prisma.poPublicNoteType.findMany();
  return types;
}

export type PoPublicNoteType = Awaited<ReturnType<typeof getAllPoPublicNoteTypes>>[number];
