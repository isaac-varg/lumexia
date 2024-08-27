"use server"

import bprActions from "@/actions/production/bprActions"
import { staticRecords } from "@/configs/staticRecords"
import { BatchSize } from "@/types/batchSize"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

interface BprWizardData {
 size: BatchSize,
 mbprId: string,
}

export const createBpr = async (wizardData: BprWizardData ) => {

  const payload2 = {
    mbpr: wizardData.mbprId,
    bprStatusId: staticRecords.production.bprStatuses.draft,
    batchSizeId: wizardData.size.id
  };

  const payload = {
    mbpr: '0ea74982-83a4-4b1f-9413-5afac79400ee',
    bprStatusId: '7a9fd26f-3153-42f5-9de4-6776f59ec670',
    batchSizeId: '0ea74982-83a4-4b1f-9413-5afac49400ee'
  }

  console.log(payload)

  const bpr = await bprActions.createNew(payload) 

  await createActivityLog('createBpr', 'bpr', bpr.id, {context: `BPR #${bpr.referenceCode} created`})

}
