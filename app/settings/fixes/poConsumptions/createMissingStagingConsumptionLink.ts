'use server'

import { transactionTypes } from "@/configs/staticRecords/transactionTypes";
import prisma from "@/lib/prisma";

// this doesn't 100 percent work but it gets most of the cases for having such bad data

const consumptions = transactionTypes.bprConsumption;

export const createMissingStagingConsumptionLink = async () => {
  // first get all the transactions whtat have the consumptions id from above and where the bprConsumption relation is null
  // e.g., it is missing the bprStagingTransactions entry
  const transactions = await prisma.transaction.findMany({
    where: {
      transactionTypeId: consumptions,
      bprStagingConsumption: null,
    }
  });

  // promise.all map these and create the transaction link 
  const createLinks = transactions.map(async (transaction) => {
    const dataString = transaction.systemNote;
    const bprReferenceCode = /\d+/;

    const match = dataString.match(bprReferenceCode);
    if (!match) return;

    const staging = await prisma.bprStaging.findFirst({
      where: {
        lotId: transaction.lotId,
        consumption: null,
        bprBom: {
          bpr: {
            referenceCode: parseInt(match[0]),
          }
        }
      }
    });

    if (staging) {
      return prisma.bprStagingConsumption.create({
        data: {
          bprStagingId: staging.id,
          transactionId: transaction.id,
        }
      });
    }
  });

  return Promise.all(createLinks);
}
