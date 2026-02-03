'use server'

import { getAuxiliariesTotalCost } from "@/app/accounting/pricing/_calculations/getAuxiliariesTotalCost";
import prisma from "@/lib/prisma"
import { getProductFillCost } from "@/app/accounting/pricing/_calculations/getProductFillCost";
import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import { accountingActions } from "..";
import { getTotalCostPerLbPurchased } from "@/app/accounting/pricing/[item]/new/_calculations/getTotalCostPerLbPurchased";

export const getFinishedProductsByPurchasedItem = async (itemId: string,) => {

  const itemPricingData = await accountingActions.pricing.item.getItemPricingData(itemId);
  const lastPrice = await accountingActions.pricing.item.getLastItemPrice(itemId)


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
        where: {
          recordStatusId: recordStatuses.active,
        },
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

  const itemCostPerLb = await getTotalCostPerLbPurchased(lastPrice, itemPricingData)

  const withAuxiliaries = await Promise.all(
    fp.map(async (current) => {
      const auxiliaries = await getAuxiliariesTotalCost(current.auxiliaries);
      const productFillCost = getProductFillCost(current.fillQuantity, itemCostPerLb)
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

export type FinishedProductFromPurchased = Awaited<ReturnType<typeof getFinishedProductsByPurchasedItem>>[number]

