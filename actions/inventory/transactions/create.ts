'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createInventoryTransaction = async (data: Prisma.TransactionUncheckedCreateInput) => {

  const response = await prisma.transaction.create({
    data,
  });

  return response;
}
