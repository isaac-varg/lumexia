import prisma from "@/lib/prisma"

export const getBpr = async (id: string) => {
  const bprs = await prisma.batchProductionRecord.findFirst({
    where: {
      id,
    },
    include: {
      status: true,
      batchSize: true,
      mbpr: {
        include: {
          producesItem: true,
        }
      },
      lotOrigin: {
        include: {
          lot: true,
        }
      }

    }
  })

  return bprs;
}
