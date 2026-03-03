"use server"

import { handleCompletedBprCascade } from "@/actions/queries/completedBprs/handleCompletedBprCascasde";

export const updateCompletedBprCascade = async (bprId: string) => {
  await handleCompletedBprCascade(bprId);
}
