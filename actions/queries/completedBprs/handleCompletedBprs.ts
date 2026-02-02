"use server"

import prisma from "@/lib/prisma"
import { handleCompletedBprCascade } from "./handleCompletedBprCascasde";
import { DateTime } from "luxon";
import { bprStatuses } from "@/configs/staticRecords/bprStatuses";

const { completed } = bprStatuses;

export interface CompletedBprsResult {
  succeeded: number[];
  failed: { bprId: string; referenceCode: number; error: string }[];
}

export const handleCompletedBprs = async (): Promise<CompletedBprsResult> => {

  const now = DateTime.now()

  const bprs = await prisma.batchProductionRecord.findMany({
    where: {
      bprStatusId: completed,
    }
  });

  const results = await Promise.allSettled(bprs.map((bpr) => handleCompletedBprCascade(bpr.id)));

  const succeeded: number[] = [];
  const failed: { bprId: string; referenceCode: number; error: string }[] = [];

  results.forEach((result, index) => {
    const bpr = bprs[index];
    if (result.status === 'fulfilled') {
      succeeded.push(bpr.referenceCode);
    } else {
      failed.push({
        bprId: bpr.id,
        referenceCode: bpr.referenceCode,
        error: result.reason instanceof Error ? result.reason.message : String(result.reason),
      });
    }
  });

  console.info(`Completed BPR Cascade ran ${now.toFormat("ccc, LLL dd yyyy @ t")} — ${succeeded.length} succeeded, ${failed.length} failed`)

  return { succeeded, failed };
}
