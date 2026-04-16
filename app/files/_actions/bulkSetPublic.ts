'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const bulkSetPublic = async (fileIds: string[], isPublic: boolean) => {
  await prisma.file.updateMany({
    where: { id: { in: fileIds } },
    data: { public: isPublic },
  });

  revalidatePath("/files");
};
