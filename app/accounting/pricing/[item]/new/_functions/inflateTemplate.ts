'use server'

import { accountingActions } from "@/actions/accounting"
import { PricingTemplate } from "@/actions/accounting/finishedProducts/templates/getAll";
import { staticRecords } from "@/configs/staticRecords";
import { PricingTemplateAuxiliary } from "@prisma/client";

export const inflateTemplate = async (template: PricingTemplate, filledWithItemId: string) => {


    const finishedProducts = await Promise.all(template.finishedProducts.map(async (fp) => {

        const { auxiliaries, fillQuantity, declaredQuantity, freeShippingCost, fillUomId, difficultyAdjustmentCost, name } = fp;
        const finishedProduct = await accountingActions.finishedProducts.create({
            filledWithItemId,
            fillQuantity,
            declaredQuantity,
            freeShippingCost,
            fillUomId,
            difficultyAdjustmentCost,
            name,
            recordStatusId: staticRecords.app.recordStatuses.active,
            finishedProductTotalCost: 0,
            auxiliariesTotalCost: 0,
            productFillCost: 0,
            consumerPrice: 0,
            markup: 0,
            profit: 0,
            profitPercentage: 0,
        });

        const inflatedAuxiliaries = await Promise.all(auxiliaries.map(async (aux: PricingTemplateAuxiliary) => {
            const infalatedAuxiliary = await accountingActions.finishedProducts.auxiliaries.create({
                apartOfFinishedProductId: finishedProduct.id,
                auxiliaryItemId: aux.auxiliaryItemId,
                difficultyAdjustmentCost: aux.difficultyAdjustmentCost,
                quantity: aux.quantity,
            })


            return infalatedAuxiliary;
        }))

        return inflatedAuxiliaries;


    }));

    return finishedProducts

}
