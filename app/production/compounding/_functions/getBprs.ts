import prisma from "@/lib/prisma";
import { DateTime } from "luxon"

export const getBprs = async () => {
  const now = DateTime.now();

  const startOfWeek = now.startOf('week').toISO(); 
  const endOfWeek = now.endOf('week').toISO(); 
  

  const bprs =  await prisma.batchProductionRecord.findMany({
    where: {
      scheduledAt: {
        gte: startOfWeek,
        lte: endOfWeek
      }
    }
  })

  return bprs
}
