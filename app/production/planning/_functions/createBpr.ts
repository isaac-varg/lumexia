"use server"

import { revalidatePage } from "@/actions/app/revalidatePage"
import bprActions from "@/actions/production/bprActions"
import { staticRecords } from "@/configs/staticRecords"
import { BatchSize } from "@/types/batchSize"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { revalidatePath } from "next/cache"

interface BprWizardData {
 size: BatchSize,
 mbprId: string,
}

export const createBpr = async (wizardData: BprWizardData ) => {

  const payload = {
    mbprId: wizardData.mbprId,
    bprStatusId: staticRecords.production.bprStatuses.draft,
    batchSizeId: wizardData.size.id
  };

  const bpr = await bprActions.createNew(payload) 


  await createActivityLog('createBpr', 'bpr', bpr.id, {context: `BPR #${bpr.referenceCode} created`})
}
