'use server'

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { BprBomItem } from "../getBprBom";
import { bprStagingStatuses } from "@/configs/staticRecords/bprStagingStatuses";

export const handleStagingComplete = async (bprBomItem: BprBomItem) => {

  const response = await prisma.bprBillOfMaterials.update({
    where: {
      id: bprBomItem.id,
    },
    data: {
      statusId: bprStagingStatuses.staged
    }
  });

  await createActivityLog('completeMaterialStaging', 'bpr', bprBomItem.bprId, { context: `#${bprBomItem.bom.identifier} ${bprBomItem.bom.item.name} was staged.` })

  return response
}
