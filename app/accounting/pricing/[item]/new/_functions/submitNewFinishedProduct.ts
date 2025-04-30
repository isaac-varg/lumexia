"use server"

import prisma from "@/lib/prisma"
import { InterimAuxiliaryItem } from "../_components/shared/StepAuxiliaries"
import { FinishedProductDetails } from "../_components/shared/StepFinishedProductDetails"
import { staticRecords } from "@/configs/staticRecords"

export const submitNewFinishedProduct = async (fillItemId: string, finishedProductDetails: FinishedProductDetails, auxiliaries: InterimAuxiliaryItem[]) => {


    // first submit the finished product
    const finishedProduct = await prisma.finishedProduct.create({
        data: {
            name: finishedProductDetails.name,
            filledWithItemId: fillItemId,
            fillQuantity: finishedProductDetails.fillQuantity,
            declaredQuantity: finishedProductDetails.declaredQuantity,
            freeShippingCost: finishedProductDetails.freeShippingCost,
            fillUomId: staticRecords.inventory.uom.lb,
            difficultyAdjustmentCost: finishedProductDetails.difficultyAdjustmentCost,
            finishedProductTotalCost: 0,
            auxiliariesTotalCost: 0,
            productFillCost: 0,
            consumerPrice: 0,
            markup: 0,
            profit: 0,
            profitPercentage: 0,
            recordStatusId: staticRecords.app.recordStatuses.active,
        }
    });


    // then handle the auxiliaries
    await Promise.all(auxiliaries.map(async (aux) => {

        // create auxiliary entry
        const response = await prisma.finishedProductAuxiliary.create({
            data: {
                apartOfFinishedProductId: finishedProduct.id,
                auxiliaryItemId: aux.auxiliaryItemId,
                quantity: parseInt(aux.quantity),
                difficultyAdjustmentCost: parseFloat(aux.difficultyAdjustmentCost)
            }
        });

        // ensure there is a pricingDataEntry
        const pricingDataEntryCount = await prisma.itemPricingData.count({
            where: {
                itemId: aux.auxiliaryItemId,
            },
        });

        if (pricingDataEntryCount === 0) {

            await prisma.itemPricingData.create({
                data: {
                    itemId: aux.auxiliaryItemId,
                    arrivalCost: 0,
                    productionUsageCost: 0,
                    auxiliaryUsageCost: 0,
                    unforeseenDifficultiesCost: 0,
                    upcomingPrice: 0,
                    upcomingPriceUomId: staticRecords.inventory.uom.lb,
                    isUpcomingPriceActive: false,
                }
            });
        }

        return response;
    }))

    return finishedProduct;
}


