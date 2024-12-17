"use server"

import bprActions from "@/actions/production/bprActions"
import { staticRecords } from "@/configs/staticRecords"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const updateBatch = async (bprId: string) => {

    await bprActions.update({ id: bprId }, { bprStatusId: staticRecords.production.bprStatuses.completed })

    await createActivityLog('modifyBprStatus', 'bprId', bprId, {context: `Status was changed to Completed automatically by Lumexia due to completing all batch steps`})
}
