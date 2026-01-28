'use server'

import prisma from "@/lib/prisma"
import { recordStatuses } from "@/configs/staticRecords/recordStatuses"
import { getOnePricingTemplate } from "./getOne"

type ApplyTemplateParams = {
  templateId: string
  itemId: string
  totalCostPerLb: number
}

/**
 * Applies a pricing template to an item by creating finished products
 * and their auxiliaries based on the template configuration.
 */
export const applyTemplate = async ({ templateId, itemId, totalCostPerLb }: ApplyTemplateParams) => {

  const template = await getOnePricingTemplate(templateId)

  if (!template) {
    throw new Error(`Template with id ${templateId} not found`)
  }

  if (!template.finishedProducts || template.finishedProducts.length === 0) {
    throw new Error('Template has no finished products to apply')
  }

  const createdFinishedProducts = await Promise.all(
    template.finishedProducts.map(async (templateFp) => {

      // Calculate costs based on template values and current item's cost per lb
      const productFillCost = templateFp.fillQuantity * totalCostPerLb
      const auxiliariesTotalCost = templateFp.auxiliaries.reduce((acc, aux) => {
        return acc + (aux.quantity * aux.difficultyAdjustmentCost)
      }, 0)
      const finishedProductTotalCost = productFillCost + auxiliariesTotalCost + templateFp.freeShippingCost + templateFp.difficultyAdjustmentCost

      // Create the finished product
      const finishedProduct = await prisma.finishedProduct.create({
        data: {
          recordStatusId: recordStatuses.active,
          name: templateFp.name,
          filledWithItemId: itemId,
          fillQuantity: templateFp.fillQuantity,
          declaredQuantity: templateFp.declaredQuantity,
          freeShippingCost: templateFp.freeShippingCost,
          fillUomId: templateFp.fillUomId,
          difficultyAdjustmentCost: templateFp.difficultyAdjustmentCost,
          finishedProductTotalCost: finishedProductTotalCost,
          auxiliariesTotalCost: auxiliariesTotalCost,
          productFillCost: productFillCost,
          // These will be recalculated when the user saves/processes
          consumerPrice: 0,
          markup: 0,
          profit: 0,
          profitPercentage: 0,
        },
      })

      // Create auxiliaries for the finished product
      if (templateFp.auxiliaries && templateFp.auxiliaries.length > 0) {
        await Promise.all(
          templateFp.auxiliaries.map(async (templateAux) => {
            await prisma.finishedProductAuxiliary.create({
              data: {
                apartOfFinishedProductId: finishedProduct.id,
                auxiliaryItemId: templateAux.auxiliaryItemId,
                quantity: templateAux.quantity,
                difficultyAdjustmentCost: templateAux.difficultyAdjustmentCost,
                recordStatusId: recordStatuses.active,
              },
            })
          })
        )
      }

      return finishedProduct
    })
  )

  return createdFinishedProducts
}
