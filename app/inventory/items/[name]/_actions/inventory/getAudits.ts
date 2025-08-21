'use server'

import prisma from "@/lib/prisma"

export const getAudits = async (itemId: string) => {

  const discrepancyAuditItems = await prisma.discrepancyAuditItem.findMany({
    where: {
      itemId,
    },
    include: {
      discrepancyAudit: {
        include: { status: true }
      },
      discrepancyAuditItemTransaction: {
        include: {
          transaction: {
            include: {
              user: true,
              transactionType: true,
              unitOfMeasurement: true,
            }
          }
        }
      },
      status: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const inventoryAudits = await prisma.inventoryAudit.findMany({
    where: {
      itemId,
    },
    include: {
      transactions: {
        include: {
          transaction: {
            include: {
              user: true,
              transactionType: true,
              unitOfMeasurement: true,
            }
          }
        }
      },
      user: true,
    },
    orderBy: {
      createdAt: 'desc'
    },
  });

  const mappedDiscrepancyAudits = discrepancyAuditItems.map(item => ({
    type: 'Discrepancy Audit',
    id: item.id,
    createdAt: item.createdAt,
    user: 'System', // Or derive from somewhere if possible
    status: item.status.name,
    transactions: item.discrepancyAuditItemTransaction.map(t => t.transaction),
    details: `Ending lots: ${item.endingLotsCount}, Ending quantity: ${item.endingTotalQuantity}`
  }));

  const mappedInventoryAudits = inventoryAudits.map(audit => ({
    type: 'Inventory Audit',
    id: audit.id,
    createdAt: audit.createdAt,
    user: audit.user.name,
    status: 'Completed',
    transactions: audit.transactions.map(t => t.transaction),
    details: `Conducted by ${audit.user.name}`
  }));

  const combined = [...mappedDiscrepancyAudits, ...mappedInventoryAudits].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return {
    inventoryAudits,
    discrepancyAudits: discrepancyAuditItems,
    combined,
  }

}

export type ItemInventoryAudits = Awaited<ReturnType<typeof getAudits>>;
