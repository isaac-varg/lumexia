'use server'

import { getUserId } from "@/actions/users/getUserId"
import { ItemFile } from "./getAllItemFiles"
import prisma from "@/lib/prisma"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const handleDeleteFile = async (file: ItemFile) => {

  const itemFileRes = await prisma.itemFile.delete({
    where: {
      id: file.id
    }
  });

  await prisma.file.delete({
    where: {
      id: file.fileId
    }
  });

  await createActivityLog('removeFile', 'item', file.itemId, { context: `File ${file.file.name} was removed` });

  return itemFileRes;

}
