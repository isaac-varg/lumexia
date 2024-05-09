"use server";

import prisma from "@/lib/prisma";

const prismaInstance = prisma as any;

export const deleteOne = async (
  model: any,
  where: { [key: string]: string }) => {
  const results = await prismaInstance[model].delete({
    where: {
        ...where,
      },
  });
  return results;
};
