"use server"

import billOfMaterialActions from "@/actions/production/billOfMaterials"
import bprActions from "@/actions/production/bprActions"
import bprBomActions from "@/actions/production/bprBom"
import { staticRecords } from "@/configs/staticRecords"
import { bprStagingStatuses } from "@/configs/staticRecords/bprStagingStatuses"
import { uom } from "@/configs/staticRecords/unitsOfMeasurement"
import { ExBillOfMaterials } from "@/types/billOfMaterials"

export const createBprBom = async (bprId: string) => {

  const bpr = await bprActions.getOne(bprId, undefined, ["batchSize"]);
  const mbprBom = await billOfMaterialActions.getAll({ mbprId: bpr.mbprId }, ["item"])
  const batchSize = await bpr.batchSize.quantity // assumes base uom of lb

  console.log(bpr)
  console.log(mbprBom)

  mbprBom.forEach(async (item: ExBillOfMaterials) => {

    const quantity = batchSize * (item.concentration * 0.01)


    await createBprBomItem(bpr.id, item.id, quantity);

  });



}

const createBprBomItem = async (bprId: string, bomId: string, quantity: number) => {

  await bprBomActions.createNew({
    bprId,
    bomId,
    quantity,
    uomId: uom.pounds,
    statusId: bprStagingStatuses.notStarted,
  })
}
