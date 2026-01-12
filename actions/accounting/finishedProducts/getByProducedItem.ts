'use server'

import { getAuxiliariesTotalCost } from "@/app/accounting/pricing/_calculations/getAuxiliariesTotalCost";
import prisma from "@/lib/prisma"
import { BatchSummations } from "@/app/accounting/pricing/[item]/newback/_components/produced/_functions/getBomPricingSummations";
import { uom } from "@/configs/staticRecords/unitsOfMeasurement";
import { recordStatuses } from "@/configs/staticRecords/recordStatuses";

export const getFinishedProductsByProducedItem = async (itemId: string, summations: BatchSummations) => {

  const fp = await prisma.finishedProduct.findMany({
    where: {
      filledWithItemId: itemId,
      recordStatusId: {
        not: recordStatuses.archived,
      }
    },
    include: {
      fillUom: true,
      auxiliaries: {
        include: {
          auxiliaryItem: {
            include: {
              itemPricingData: {
                include: {
                  upcomingPriceUom: true,
                },
              },
              aliases: true,
              itemType: true,
            },
          },
        },
      },
    },
  });


  const withAuxiliaries = await Promise.all(
    fp.map(async (current) => {
      const auxiliaries = await getAuxiliariesTotalCost(current.auxiliaries);

      if (current.fillUomId !== uom.pounds) {
        throw new Error('Fill UOM must be in pounds')
      }

      const productFillCost = current.fillQuantity * summations.totalCostPerLb;

      const finishedProductTotalCost = productFillCost +
        auxiliaries.total +
        current.difficultyAdjustmentCost +
        current.freeShippingCost;

      return {
        ...current,
        auxiliaries,
        calculatedTotals: {
          productFillCost,
          finishedProductTotalCost
        }
      };
    })
  );



  return withAuxiliaries;
};

export type FinishedProductFromProduced = Awaited<ReturnType<typeof getFinishedProductsByProducedItem>>[number]


