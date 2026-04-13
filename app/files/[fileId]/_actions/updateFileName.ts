'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const updateFileName = async (fileId: string, name: string) => {
  await prisma.file.update({ where: { id: fileId }, data: { name } });
  createActivityLog("modifyFile", "file", fileId, { context: `Renamed file to "${name}"` });
  revalidatePath(`/files/${fileId}`);
  revalidatePath("/files");
};
