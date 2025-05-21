'use server'

import { productionActions } from "@/actions/production";
import { staticRecords } from "@/configs/staticRecords";

export const setActiveBatchSize = async (activeBatchSizeId: string, mbprId: string) => {


    const batchSizes = await productionActions.mbprs.batchSizes.getAllByMbpr(mbprId);

    const toDeactive = batchSizes.filter((size) => size.id !== activeBatchSizeId);

    if (toDeactive.length !== 0) {

        const deactivated = toDeactive.map(async (td) => {
            const response = await productionActions.mbprs.batchSizes.update(td.id, { recordStatusId: staticRecords.app.recordStatuses.inactive })

            return response
        });

        await Promise.all(deactivated)
    }


    await productionActions.mbprs.batchSizes.update(activeBatchSizeId, { recordStatusId: staticRecords.app.recordStatuses.active })


}
