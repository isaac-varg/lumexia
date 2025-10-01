"use server"

import { uom } from "@/configs/staticRecords/unitsOfMeasurement"
import prisma from "@/lib/prisma"
import { Item } from "@prisma/client"

export const fixItems = async (missing: Item[]) => {

  const response = await Promise.all(missing.map(async (item) => {

    const fix = await prisma.itemPricingData.create({
      data: {
        itemId: item.id,
        arrivalCost: 0,
        productionUsageCost: 0,
        unforeseenDifficultiesCost: 0,
        isUpcomingPriceActive: false,
        upcomingPrice: 0,
        upcomingPriceUomId: uom.pounds,
        auxiliaryUsageCost: 0,
        overallItemCost: 0,
      }
    });

    return fix;

  }));

  return response;

}
