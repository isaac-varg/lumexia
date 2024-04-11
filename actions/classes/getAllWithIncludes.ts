"use server";

import prisma from "@/lib/prisma";

const prismaInstance = prisma as any;

export const getAllWithIncludes = async (model: any, includes: string[]) => {
  const include: Record<string, boolean> = includes.reduce(
    (acc: Record<string, boolean>, curr: string) => {
      acc[curr] = true;
      return acc;
    },
    {} as Record<string, boolean>
  );

  const results = await prismaInstance[model].findMany({
    include: {
      ...include,
    }
  });
  return results;
};
