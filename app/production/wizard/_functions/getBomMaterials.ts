"use server"

import billOfMaterialActions from "@/actions/production/billOfMaterials"

export const getBomMaterials = async (stepId: string) => {

  const materials = await billOfMaterialActions.getAll({stepId}, ["item", 'step'])

  return materials;
}
