"use server"

import bprStagingActions from "@/actions/production/bprStagings"

export const createBprStaging = async (payload: any) => {

   
  const staging = await bprStagingActions.createNew(payload)
}
