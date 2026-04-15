'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

type AddFileTagInput =
  | { fileId: string; tagId: string; newTag?: never }
  | { fileId: string; tagId?: never; newTag: { name: string; bgColor: string; textColor: string } };

export const addFileTag = async (input: AddFileTagInput) => {
  const { fileId } = input;

  let tagId: string;
  if ("tagId" in input && input.tagId) {
    tagId = input.tagId;
  } else if ("newTag" in input && input.newTag) {
    const { name, bgColor, textColor } = input.newTag;
    const tag = await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name, bgColor, textColor },
    });
    tagId = tag.id;
  } else {
    throw new Error("addFileTag: must provide tagId or newTag");
  }

  await prisma.fileTag.upsert({
    where: { fileId_tagId: { fileId, tagId } },
    update: {},
    create: { fileId, tagId },
  });

  createActivityLog("modifyFile", "file", fileId, { context: "Added tag to file" });
  revalidatePath(`/files/${fileId}`);
  revalidatePath("/files");
};
