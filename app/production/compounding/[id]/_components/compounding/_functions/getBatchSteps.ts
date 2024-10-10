"use server"

import bprBatchStepActions from "@/actions/production/bprBatchSteps"

export const getBatchSteps = async (bprId: string) => {

    const batchSteps = await bprBatchStepActions.getAll({ bprId, }, ["batchStep", "bprStepActionables", "bpr"])
    return batchSteps

}
