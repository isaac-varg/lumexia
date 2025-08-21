'use server'

import prisma from "@/lib/prisma"

export const getTransactionsByLot = async (lotId: string) => {

  const transactions = await prisma.transaction.findMany({
    where: {
      lotId,
    },
    include: {
      audit: true,
      discrepancyAuditItemTransaction: true,
      transactionType: true,
      user: true,
      // lol
      bprStagingConsumption: {
        include: {
          bprStaging: {
            include: {
              pulledByUser: true,
              bprBom: {
                include: {
                  bpr: {
                    include: {
                      mbpr: {
                        include: {
                          producesItem: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    }
  });




  return {
    transactions,
  };

}

export type LotTransactionData = Awaited<ReturnType<typeof getTransactionsByLot>>;
export type LotTransaction = LotTransactionData['transactions'][number];


