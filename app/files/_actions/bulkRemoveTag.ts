'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const bulkRemoveTag = async (fileIds: string[], tagId: string) => {
  await prisma.fileTag.deleteMany({
    where: { fileId: { in: fileIds }, tagId },
  });

  revalidatePath("/files");
};
