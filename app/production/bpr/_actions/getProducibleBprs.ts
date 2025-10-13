import prisma from "@/lib/prisma";
import { DateTime } from "luxon"

export const getProducibleBprs = async () => {
  const now = DateTime.now();

  const startOfWeek = now.startOf('week').toISO();
  const endOfWeek = now.endOf('week').plus({ days: 7 }).toISO();


  const bprs = await prisma.batchProductionRecord.findMany({
    where: {
      completedAt: null,
      scheduledForStart: {
        lte: endOfWeek,
      },
      OR: [
        {
          scheduledForEnd: {
            gte: startOfWeek,
          },
        },
        {
          scheduledForEnd: null,
        },
      ],
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

  return bprs
}

export type ProducibleBpr = Awaited<ReturnType<typeof getProducibleBprs>>[number]
