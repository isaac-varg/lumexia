'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createQcRecord = async (data: Prisma.QcRecordUncheckedCreateInput) => {
  const response = await prisma.qcRecord.create({
    data,
    include: {
      conductedBy: true,
      status: true,
      examinationType: true,
      examinedLot: {
        include: {
          item: true,
          lotOrigin: {
            include: {
              bpr: true,
              purchaseOrder: true,
            }
          }
        },
      },
      linkedBpr: true,
      linkedPurchaseOrderItem: true,
    }
  });

  return response
};
