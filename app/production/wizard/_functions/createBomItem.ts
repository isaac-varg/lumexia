import billOfMaterialActions from "@/actions/production/billOfMaterials"

type Payload = {
  itemId: string
  mbprId: string
  identifier: string
  concentration: number
  stepId: string
}

export const createBomItem = async (payload: Payload) => {

  const response = await billOfMaterialActions.createNew(payload)

  return response;
}
