"use server"

import { revalidatePage } from "@/actions/app/revalidatePage";
import bprActions from "@/actions/production/bprActions";
import { staticRecords } from "@/configs/staticRecords";
import { BatchProductionRecord } from "@/types/batchProductionRecord";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";

export const handleBeginStaging = async (bpr: BatchProductionRecord) => {
    await bprActions.update({ id: bpr.id }, { bprStatusId: staticRecords.production.bprStatuses.stagingMaterials })
    await createActivityLog("upateBprStatus", "bpr", bpr.id, { context: `BPR #${bpr.releasedAt} was set to staging from the queued panel` })
    revalidatePage("/production/compounding/[id]/")
}
