"use server";

import prisma from "@/lib/prisma";
import { getConversionFactor } from "@/utils/uom/getConversionFactor";
import { groupByMonthAndYear } from "@/utils/general/groupByMonthAndYear";
import { UnitOfMeasurement } from "@prisma/client";
import { getPricingChartData } from "./getPricingChartData";
import { ExPurchaseOrderItem } from "@/types/purchaseOrderItem";
//
// TODO make this configurable and then pull what the use selected as their default uom rather than hard code it. . . what if someone doesn't want to only use lb as their default.
const defaultUomId = "68171f7f-3ac0-4a3a-b197-18742ebf6b5b";

export interface SupplierFilterItems {
  totalSpent: number;
  lastPaid: { price: number, uom: UnitOfMeasurement, timestamp: Date };
  uoms: string[]
  prices: any
  purchases: ExPurchaseOrderItem[];
  pricingChartData: any;
}

export const getFilteredItems = async (itemId: string, supplierId: string) => {
  const itemData = await prisma.purchaseOrderItem.findMany({
    where: {
      purchaseOrders: {
        supplierId,
      },
      itemId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      purchaseOrders: true,
      uom: true,
      item: true
    },
  });

  const totalSpent = itemData.reduce((total, item) => {
    return total + item.quantity * item.pricePerUnit;
  }, 0);
  const lastPaid = { price: itemData[0].pricePerUnit, uom: itemData[0].uom, timestamp: itemData[0].createdAt };
  const uomIds = itemData
    .map((item) => item.uom.id)
    .filter((value, index, self) => self.indexOf(value) === index);

  const uoms = itemData
    .map((item) => item.uom.abbreviation)
    .filter((value, index, self) => self.indexOf(value) === index);

  const isPurchasedInMultipleUom = uomIds.length > 1;


  const prices = await Promise.all(
    itemData.map(async (item) => {
      let price = item.pricePerUnit;

      if (isPurchasedInMultipleUom) {
        const isDefaultUom = item.uomId === defaultUomId;

        if (!isDefaultUom) {
          const conversionFactor = await getConversionFactor(
            item.uomId,
            defaultUomId,
          );
          const convertedPricePerUnit = item.pricePerUnit / conversionFactor;
          price = convertedPricePerUnit;
        } else {

          price = item.pricePerUnit;
        }

      }
      return { price: price, createdAt: item.createdAt }
    }),
  );

  const pricesGrouped = groupByMonthAndYear(prices)
  
  const pricingChartData = getPricingChartData(pricesGrouped)

  const data = {
    prices: pricesGrouped,
    lastPaid,
    uoms,
    totalSpent,
    purchases: itemData,
    pricingChartData,
    //   item: itemData.item

  };
  return data;
};
