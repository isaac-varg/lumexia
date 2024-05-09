"use server";

import prisma from "@/lib/prisma";

const prismaInstance = prisma as any;

export const update = async (
  model: any,
  where: { [key: string]: string },
  data: any
) => {
  const results = await prismaInstance[model].update({
    where: {
        ...where,
      },
    data,
  });
  return results;
};
