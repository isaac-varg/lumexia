'use server'
import prisma from "@/lib/prisma"

export type TagOption = {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
};

export const getAllTags = async (): Promise<TagOption[]> => {
  return prisma.tag.findMany({
    select: { id: true, name: true, bgColor: true, textColor: true },
    orderBy: { name: "asc" },
  });
};
