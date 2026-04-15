'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const updateFilePublic = async (fileId: string, isPublic: boolean) => {
  await prisma.file.update({ where: { id: fileId }, data: { public: isPublic } });
  createActivityLog("modifyFile", "file", fileId, {
    context: isPublic ? "Marked file as public" : "Marked file as private",
  });
  revalidatePath(`/files/${fileId}`);
  revalidatePath("/files");
};
