'use server'

import prisma from "@/lib/prisma"
import { BprStagingItem } from "../getBprStagings"
import { staticRecords } from "@/configs/staticRecords"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";

const notStarted = staticRecords.production.bprStagingStatuses.notStarted;

export const handleSingleStagingDeny = async (qualityMode: 'primary' | 'secondary', note: string, staging: BprStagingItem, bprId: string, itemName: string) => {

  // update staging: change status and set verified booleans to false
  const response = await prisma.bprStaging.update({
    where: {
      id: staging.id,
    },
    data: {
      bprStagingStatusId: notStarted,
      isPrimaryVerified: false,
      isSecondaryVerified: false // not necessary
    }
  });

  // update bomitem
  await prisma.bprBillOfMaterials.update({
    where: {
      id: staging.bprBomId,
    },
    data: {
      statusId: staticRecords.production.bprBomStatuses.notStarted,
    }
  });
  // make note
  await createActivityLog('stagingDenied', 'bpr', bprId, { context: `${staging.quantity} of ${itemName} was denied during ${qualityMode} verification.` })

  return response;

}
