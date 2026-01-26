'use server'

import prisma from "@/lib/prisma"
import { ProducedPricingSummations } from "../getBomWithPricing"
import { getPricingMbpr } from "../getPricingMbpr"
import { uom } from "@/configs/staticRecords/unitsOfMeasurement"

export const archiveProducedPricingData = async (
  examinationId: string,
  mbprId: string,
  pricingData: ProducedPricingSummations
) => {
  if (!pricingData || 'errorOnFunction' in pricingData) return;

  const mbpr = await getPricingMbpr(mbprId);

  if (!mbpr || mbpr.BatchSize.length === 0) {
    throw new Error("MBPR or Batch Size not found for archiving")
  }

  const batchSize = mbpr.BatchSize[0];
  const vessel = batchSize.batchSizeCompoundingVessels[0];

  const producedArchive = await prisma.producedPricingDataArchive.create({
    data: {
      examinationId,
      mbprId: mbpr.id,
      mbprVersionLabel: mbpr.versionLabel || '',
      batchSizeId: batchSize.id,
      batchSizeQuantity: batchSize.quantity,
      compoundingVesselId: vessel.compoundingVesselId,
      compoundingVesselEquipmentName: vessel.compoundingVessel.equipment.name,
      compoundingTankTime: vessel.tankTime,
      bomCount: pricingData.bomWithCost.length,
      totalBomCostPerBatch: pricingData.totalBomCostPerBatch,
      totalBomCostPerLb: pricingData.totalBomCostPerLb,
      totalCostPerBatch: pricingData.totalCostPerBatch,
      totalCostPerLb: pricingData.totalCostPerLb,
    }
  });

  // archive BOM items
  await Promise.all(pricingData.bomWithCost.map(async (i) => {
    
    const priceUomId = i.isUpcomingPriceActive 
        ? i.item.itemPricingData[0]?.upcomingPriceUomId 
        : i.item.purchaseOrderItem[0]?.uomId || uom.pounds;

    await prisma.bomPricingDataArchive.create({
      data: {
        examinationId,
        producedPricingDataArchiveId: producedArchive.id,
        bomId: i.id,
        itemId: i.itemId,
        totalMaterialCost: i.itemCostInBatch,
        materialPrice: i.itemCost,
        materialPriceOrigin: i.priceUsed,
        upcomingPriceUsed: i.isUpcomingPriceActive,
        upcomingPriceUomId: priceUomId,
        arrivalCost: i.item.itemPricingData[0]?.arrivalCost || 0,
        unforeseenDifficultiesCost: i.item.itemPricingData[0]?.unforeseenDifficultiesCost || 0,
        productionUsageCost: i.item.itemPricingData[0]?.productionUsageCost || 0,
        overallItemCostPerLb: i.itemCostPerLb,
        overallItemCostPerBatch: i.itemCostInBatch,
      }
    })
  }))
}
