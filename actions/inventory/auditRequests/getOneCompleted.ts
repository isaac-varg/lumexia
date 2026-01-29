'use server'

import prisma from "@/lib/prisma"

export const getOneCompletedAuditRequest = async (id: string) => {
  const audit = await prisma.auditRequest.findUniqueOrThrow({
    where: { id },
    include: {
      requestedBy: true,
      status: true,
      item: true,
      notes: {
        include: {
          noteType: true,
          user: true,
        },
        orderBy: {
          createdAt: 'asc'
        }
      },
      inventoryAudit: {
        include: {
          user: true,
          transactions: {
            include: {
              transaction: {
                include: {
                  lot: {
                    include: {
                      uom: true,
                    }
                  },
                  transactionType: true,
                  unitOfMeasurement: true,
                }
              }
            }
          }
        }
      },
    },
  })

  return audit;
}

export type CompletedAuditDetail = Awaited<ReturnType<typeof getOneCompletedAuditRequest>>
