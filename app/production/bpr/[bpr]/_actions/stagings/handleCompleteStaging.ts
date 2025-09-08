'use server'

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { BprBomItem } from "../getBprBom";

export const handleStagingComplete = async (bprBomItem: BprBomItem) => {

  const response = await prisma.bprBillOfMaterials.update({
    where: {
      id: bprBomItem.id,
    },
    data: {
      statusId: staticRecords.production.bprStagingStatuses.staged
    }
  });

  await createActivityLog('completeMaterialStaging', 'bpr', bprBomItem.bprId, { context: `#${bprBomItem.bom.identifier} ${bprBomItem.bom.item.name} was staged.` })

  return response
}
