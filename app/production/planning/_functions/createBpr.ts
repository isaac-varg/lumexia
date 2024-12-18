"use server"

import bprActions from "@/actions/production/bprActions"
import { staticRecords } from "@/configs/staticRecords"
import { BatchSize } from "@/types/batchSize"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { createBprBom } from "./createBprBom"
import { generateBprBatchStepEntries } from "./generateBprBatchStepEntries"
import lotActions from "@/actions/inventory/lotActions"
import { Item } from "@/types/item"
import { generateLotNumber } from "@/utils/lot/generateLotNumber"
import lotOriginActions from "@/actions/inventory/lotOriginActions"
import { BatchProductionRecord } from "@/types/batchProductionRecord"
import containerActions from "@/actions/inventory/containerActions"
import { initiateNotionBpr } from "./createNotionBpr"

interface BprWizardData {
    size: BatchSize,
    mbprId: string,
    selectedItem: Item,
}

export const createBpr = async (wizardData: BprWizardData) => {

    const payload = {
        mbprId: wizardData.mbprId,
        bprStatusId: staticRecords.production.bprStatuses.draft,
        batchSizeId: wizardData.size.id
    };

    const lotPayload = {
        itemId: wizardData.selectedItem.id,
        lotNumber: generateLotNumber(wizardData.selectedItem.referenceCode),
        initialQuantity: 0, //wizardData.size.quantity,
        uomId: staticRecords.inventory.uom.lb,
    }


    const bpr: BatchProductionRecord = await bprActions.createNew(payload)

    const lot = await lotActions.createNew(lotPayload)


    // todo this must be specified and stored else where because different products have different densities and therefore differing container weights. also some products are filled into different containers than drums.

    const containerPayload = {
        lotId: lot.id,
        containerTypeId: staticRecords.inventory.containerTypes.drum,
        uomId: staticRecords.inventory.uom.lb,
        containerWeight: 450,
    }


    await lotOriginActions.createNew({
        lotId: lot.id,
        originType: 'batchProduction',
        bprId: bpr.id,
    });

    await containerActions.createNew(containerPayload);

    await createBprBom(bpr.id)
    await generateBprBatchStepEntries(bpr.id)

    await initiateNotionBpr(bpr.id)

    await createActivityLog('createBpr', 'bpr', bpr.id, { context: `BPR #${bpr.referenceCode} created` })
    await createActivityLog('createLot', 'lot', lot.id, { context: `Lot was created from bpr #${bpr.referenceCode}` })

}





