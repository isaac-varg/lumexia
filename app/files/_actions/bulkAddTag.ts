'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

type BulkAddTagInput =
  | { fileIds: string[]; tagId: string; newTag?: never }
  | { fileIds: string[]; tagId?: never; newTag: { name: string; bgColor: string; textColor: string } };

export const bulkAddTag = async (input: BulkAddTagInput) => {
  let tagId: string;

  if (input.newTag) {
    const tag = await prisma.tag.create({ data: input.newTag });
    tagId = tag.id;
  } else {
    tagId = input.tagId;
  }

  await prisma.fileTag.createMany({
    data: input.fileIds.map((fileId) => ({ fileId, tagId })),
    skipDuplicates: true,
  });

  revalidatePath("/files");
};
