"use server";

import prisma from "@/lib/prisma";

const prismaInstance = prisma as any;

export const getOne = async (
  model: any,
  id: string,
  includes?: string[] | null
) => {
  let include: Record<string, boolean> | null = null;

  if (includes) {
    const records: Record<string, boolean> = includes.reduce(
      (acc: Record<string, boolean>, curr: string) => {
        acc[curr] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );

    include = records;
  }

  const results = await prismaInstance[model].findUnique({
    where: {
      id,
    },
    include: includes ? { ...include } : null,
  });
  return results;
};
