"use server";

import prisma from "@/lib/prisma";

const prismaInstance = prisma as any;

export const getAll = async (
  model: any,
  where?: { [key: string]: string },
  includes?: string[] | null,
  orderBy?: { [key: string]: "asc" | "desc" }[],
) => {
  let include: Record<string, boolean> | null = null;

  if (includes) {
    const records: Record<string, boolean> = includes.reduce(
      (acc: Record<string, boolean>, curr: string) => {
        acc[curr] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );

    include = records;
  }

  const queryOptions: any = {
    include: includes ? { ...include } : null,
  };

  if (where) {
    queryOptions.where = { ...where };
  }

  if (orderBy) {
    queryOptions.orderBy = orderBy;
  }

  const results = await prismaInstance[model].findMany(queryOptions);
  return results;
};

