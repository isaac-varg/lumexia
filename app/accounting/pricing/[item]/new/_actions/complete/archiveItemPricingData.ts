'use server'

import { ItemPricingData } from "@/actions/accounting/pricing/getItemPricingData"
import prisma from "@/lib/prisma"

export const archiveItemPricingData = async (examinationId: string, pricingData: ItemPricingData) => {
  if (!pricingData) return;

  await prisma.itemPricingDataArchive.create({
    data: {
      examinationId,
      currentItemPricingDataId: pricingData.id,
      arrivalCost: pricingData.arrivalCost,
      productionUsageCost: pricingData.productionUsageCost,
      auxiliaryUsageCost: pricingData.auxiliaryUsageCost,
      unforeseenDifficultiesCost: pricingData.unforeseenDifficultiesCost,
      isUpcomingPriceActive: pricingData.isUpcomingPriceActive,
      upcomingPrice: pricingData.upcomingPrice,
      upcomingPriceUomId: pricingData.upcomingPriceUomId,
      overallItemCost: pricingData.overallItemCost,
    }
  })
}
