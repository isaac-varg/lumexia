'use server'

import prisma from "@/lib/prisma";

export const getBpr = async (transactionSystemNote: string) => {
  const regex = /\d+/;

  const match = transactionSystemNote.match(regex);
  if (!match) return;


  const referenceCode = parseInt(match[0])

  const bpr = await prisma.batchProductionRecord.findFirst({
    where: {
      referenceCode,
    }
  })


  return bpr;


}
