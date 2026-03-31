'use server'

import { productionActions } from "@/actions/production";
import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";

export const setActiveBatchSize = async (activeBatchSizeId: string, mbprId: string) => {


  const batchSizes = await productionActions.mbprs.batchSizes.getAllByMbpr(mbprId);

  const toDeactive = batchSizes.filter((size) => size.id !== activeBatchSizeId);

  if (toDeactive.length !== 0) {

    const deactivated = toDeactive.map(async (td) => {
      const response = await productionActions.mbprs.batchSizes.update(td.id, { recordStatusId: recordStatuses.inactive })

      return response
    });

    await Promise.all(deactivated)
  }


  await productionActions.mbprs.batchSizes.update(activeBatchSizeId, { recordStatusId: recordStatuses.active })

  await createActivityLog('Set Active Batch Size', 'mbpr', mbprId, { context: 'Changed active batch size' })
}
