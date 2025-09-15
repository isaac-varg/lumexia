"use server"

import batchStepActions from "@/actions/production/batchSteps"
import { groupByProperty } from "@/utils/data/groupByProperty";

export const getBatchSteps = async (mbprId: string) => {

  const data = await batchStepActions.getAll({ mbprId });
  return groupByProperty(data, "phase")
}

export type BatchStep = Awaited<ReturnType<typeof getBatchSteps>>[number]
