"use server"

import bprActions from "@/actions/production/bprActions"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";


export const updateBpr = async (bprId: string, payload: any, context?: string) => {

    await bprActions.update({id: bprId} , payload);

    await createActivityLog("updateBpr", "bpr", bprId, {context,})



}
