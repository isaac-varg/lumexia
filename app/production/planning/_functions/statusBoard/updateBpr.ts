"use server"
import { revalidatePage } from "@/actions/app/revalidatePage"
import bprActions from "@/actions/production/bprActions"

export const updateBpr = async (bprId: string, payload: any) => {

  console.log('updateBpr ran')
  await bprActions.update({ id: bprId }, payload)

  revalidatePage("/production/planning")


} 
