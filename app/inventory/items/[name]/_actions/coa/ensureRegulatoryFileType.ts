"use server"

import prisma from "@/lib/prisma";

export const ensureRegulatoryFileType = async () => {
  const existing = await prisma.itemFileType.findFirst({
    where: {
      name: {
        equals: "Regulatory",
        mode: "insensitive",
      },
    },
  });

  if (existing) return existing;

  return prisma.itemFileType.create({
    data: {
      name: "Regulatory",
      bgColor: "#1E40AF",
      textColor: "#FFFFFF",
    },
  });
};
