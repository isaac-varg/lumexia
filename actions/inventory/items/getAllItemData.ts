"use server"

import { getLotsByItem } from "@/actions/auxiliary/getLotsByItem";

export const getAllItemData = async (itemId: string) => {

  const lots = await getLotsByItem(itemId);

  const payload = {
    lots,
  }

  return payload
}

export type ItemAllData = Awaited<ReturnType<typeof getAllItemData>> 
