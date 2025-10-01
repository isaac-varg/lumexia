"use server"

import bprActions from "@/actions/production/bprActions"
import { bprStatuses } from "@/configs/staticRecords/bprStatuses"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const updateBatch = async (bprId: string) => {

  await bprActions.update({ id: bprId }, { bprStatusId: bprStatuses.completed })

  await createActivityLog('modifyBprStatus', 'bprId', bprId, { context: `Status was changed to Completed automatically by Lumexia due to completing all batch steps` })
}
