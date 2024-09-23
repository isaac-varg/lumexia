"use server"

import lotActions from "@/actions/inventory/lotActions"

export const getLot = async (lotId: string) => {
    
  const lot = await lotActions.getOne(lotId,undefined, ["item"]);

  return lot;

}
