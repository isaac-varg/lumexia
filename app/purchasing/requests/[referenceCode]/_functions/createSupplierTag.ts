'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createSupplierTag = async (data: Prisma.PurchasingRequestSupplierTagUncheckedCreateInput) => {
  return await prisma.purchasingRequestSupplierTag.create({
    data,
  });
};

