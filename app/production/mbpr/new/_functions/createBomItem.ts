import billOfMaterialActions from "@/actions/production/billOfMaterials"
import { recordStatuses } from "@/configs/staticRecords/recordStatuses"

type Payload = {
    itemId: string
    mbprId: string
    identifier: string
    concentration: number
    stepId: string
}

export const createBomItem = async (payload: Payload) => {

    const response = await billOfMaterialActions.createNew({
        ...payload,
        recordStatusId: recordStatuses.active,
    })

    return response;
}
