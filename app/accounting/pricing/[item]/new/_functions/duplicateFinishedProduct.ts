'use server'

import { accountingActions } from "@/actions/accounting"
import { FinishedProductFromProduced } from "@/actions/accounting/finishedProducts/getByProducedItem"
import { FinishedProductFromPurchased } from "@/actions/accounting/finishedProducts/getByPurchasedItem"
import { staticRecords } from "@/configs/staticRecords"
import { recordStatuses } from "@/configs/staticRecords/recordStatuses"

export const duplicateFinishedProduct = async (finishedProductToDuplicate: FinishedProductFromPurchased | FinishedProductFromProduced, isPurchased: boolean) => {


  // finished product (fp) for type
  const fp = isPurchased ? finishedProductToDuplicate as FinishedProductFromPurchased : finishedProductToDuplicate as FinishedProductFromProduced


  // create the finished product copy  (fpc)
  const fpc = await accountingActions.finishedProducts.create({
    recordStatusId: recordStatuses.active,
    name: `Copy of ${fp.name}`,
    filledWithItemId: fp.filledWithItemId,
    fillQuantity: fp.fillQuantity,
    declaredQuantity: fp.declaredQuantity,
    freeShippingCost: fp.freeShippingCost,
    fillUomId: fp.fillUomId,
    difficultyAdjustmentCost: fp.difficultyAdjustmentCost,
    finishedProductTotalCost: fp.finishedProductTotalCost,
    auxiliariesTotalCost: fp.auxiliariesTotalCost,
    productFillCost: fp.productFillCost,
    consumerPrice: fp.consumerPrice,
    markup: fp.markup,
    profit: fp.profit,
    profitPercentage: fp.profitPercentage
  });


  // create all the auxiliaries

  await Promise.all(fp.auxiliaries.breakdown.map(async (aux) => {
    const response = await accountingActions.finishedProducts.auxiliaries.create({
      apartOfFinishedProductId: fpc.id,
      auxiliaryItemId: aux.auxiliaryItemId,
      quantity: aux.quantity,
      difficultyAdjustmentCost: aux.difficultyAdjustmentCost,
    })

    return response;
  }));

  return fpc;

}
