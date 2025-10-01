"use server"

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"
import { handleCompletedBprCascade } from "./handleCompletedBprCascasde";
import { DateTime } from "luxon";
import { bprStatuses } from "@/configs/staticRecords/bprStatuses";

const { completed } = bprStatuses;

export const handleCompletedBprs = async () => {

  const now = DateTime.now()

  const bprs = await prisma.batchProductionRecord.findMany({
    where: {
      bprStatusId: completed,
    }
  });



  const cascades = await Promise.all(bprs.map(async (bpr) => {
    const cascade = await handleCompletedBprCascade(bpr.id)
    return cascade;
  }));

  console.info(`Completed BPR Cascade ran ${now.toFormat("ccc, LLL dd yyyy @ t")}`)


  return cascades;
}
