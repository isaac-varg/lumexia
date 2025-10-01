'use server'

import prisma from "@/lib/prisma"
import { accountingActions } from "..";
import { staticRecords } from "@/configs/staticRecords";
import { recordStatuses } from "@/configs/staticRecords/recordStatuses";

export const deletedFilledConsumerContainer = async (id: string) => {

  const response = await prisma.itemConsumerContainer.delete({
    where: {
      id,
    }
  });

  if (response) {
    return response;
  }


  // handle already used consumer container ( archive to retain history) ; 
  const update = await accountingActions.filledConsumerContainers.update(id, { recordStatusId: recordStatuses.archived })

  return update;
}

