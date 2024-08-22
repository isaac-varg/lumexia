"use server"

import batchStepActions from "@/actions/production/batchSteps"
import { groupByProperty } from "@/utils/data/groupByProperty";
import { sortByProperty } from "@/utils/data/sortByProperty";

export const getBatchSteps = async (mbprId: string) => {

  const data = await batchStepActions.getAll({ mbprId });
  return groupByProperty(data, "phase")
}
