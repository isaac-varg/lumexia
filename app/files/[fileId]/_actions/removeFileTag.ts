'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const removeFileTag = async (fileTagId: string) => {
  const fileTag = await prisma.fileTag.delete({ where: { id: fileTagId } });
  createActivityLog("modifyFile", "file", fileTag.fileId, { context: "Removed tag from file" });
  revalidatePath(`/files/${fileTag.fileId}`);
  revalidatePath("/files");
};
