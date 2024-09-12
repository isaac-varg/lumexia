import prisma from "@/lib/prisma";

export const getBprBomItem = async (id: string) => {

  const bomItem = await prisma.bprBillOfMaterials.findUnique({
    where: {
      id,
    },
    include: {
      bom: {
        include: {
          item: true
        }
      },
      status: true,
      bpr: true
    }
  })

  return bomItem;

}
