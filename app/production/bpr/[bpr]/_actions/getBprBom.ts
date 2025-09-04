'use server'

import prisma from "@/lib/prisma"

export const getBprBom = async (bprId: string) => {
  const bom = await prisma.bprBillOfMaterials.findMany({
    where: {
      bprId,
    },
    include: {
      status: true,
      bom: {
        include: {
          item: {
            include: {
              aliases: true
            }
          },
        }
      }
    }
  });

  return bom
};

export type BprBomItem = Awaited<ReturnType<typeof getBprBom>>[number]
