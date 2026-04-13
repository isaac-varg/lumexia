'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { FileModule } from "../../_actions/getAllFiles"

export const updateFileType = async ({
  fileId,
  module,
  junctionId,
  fileTypeId,
}: {
  fileId: string;
  module: FileModule;
  junctionId: string;
  fileTypeId: string;
}) => {
  if (module === "item") {
    await prisma.itemFile.update({ where: { id: junctionId }, data: { fileTypeId } });
  } else if (module === "po-accounting") {
    await prisma.poAccountingFile.update({ where: { id: junctionId }, data: { fileTypeId } });
  } else if (module === "qc-record") {
    await prisma.qcRecordFile.update({ where: { id: junctionId }, data: { fileTypeId } });
  }

  createActivityLog("modifyFile", "file", fileId, { context: "Changed file type" });
  revalidatePath(`/files/${fileId}`);
  revalidatePath("/files");
};
