'use server'

import prisma from "@/lib/prisma"
import { StagingImage } from "../../_components/staging/PhotoStep"
import { staticRecords } from "@/configs/staticRecords"
import { getUserId } from "@/actions/users/getUserId"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { uom } from "@/configs/staticRecords/unitsOfMeasurement"
import { bprStagingStatuses } from "@/configs/staticRecords/bprStagingStatuses"

export const handleStagingCascade = async (bprBomId: string, lotId: string, quantity: number, images: StagingImage[], bprId: string, itemName: string, itemReference: string) => {

  // create the staging entry
  const userId = await getUserId();

  const staging = await prisma.bprStaging.create({
    data: {
      bprBomId,
      lotId,
      quantity,
      uomId: uom.pounds,
      bprStagingStatusId: bprStagingStatuses.staged,
      pulledByUserId: userId,
    }
  })
  // link the images
  await Promise.all(images.map(async (image) => {
    const response = await prisma.bprStagingFile.create({
      data: {
        fileId: image.fileId,
        bprStagingId: staging.id,
      }
    })
  }));

  await createActivityLog('stageMaterial', 'bprId', bprId, { context: `${quantity} lbs of #${itemReference} ${itemName} was staged.` })

  return staging;

}
