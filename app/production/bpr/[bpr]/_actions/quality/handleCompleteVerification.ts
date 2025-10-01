'use server'

import prisma from "@/lib/prisma"
import { staticRecords } from "@/configs/staticRecords"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { bprStagingStatuses } from "@/configs/staticRecords/bprStagingStatuses"

const { verified, secondaryVerification } = bprStagingStatuses

export const handleCompleteVerification = async (qualityMode: 'primary' | 'secondary', bprBomItemId: string, bprBomItemName: string, bprId: string) => {
  const statusId = qualityMode === 'primary' ? verified : secondaryVerification;

  // update bom item
  const response = await prisma.bprBillOfMaterials.update({
    where: {
      id: bprBomItemId,
    },
    data: {
      statusId,
    }
  });

  // make note 
  await createActivityLog('bomItemPrimaryVerification', 'bpr', bprId, { context: `${bprBomItemName} completed ${qualityMode} verification.` })

  return response;
}
