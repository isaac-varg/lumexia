'use server'

import prisma from "@/lib/prisma"

export const getAllQcRecordsByItem = async (itemId: string) => {
  const exams = await prisma.qcRecord.findMany({
    where: {
      examinedLot: {
        is: {
          itemId,
        }
      }
    },
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
      qcRecordNotes: {
        include: {
          user: true,
          noteType: true,
        },
      },
      QcRecordFile: {
        include: {
          file: true,
          fileType: true,
        }
      }
    }
  });

  return exams
}

export type QcRecordExpanded = Awaited<ReturnType<typeof getAllQcRecordsByItem>>[number]
