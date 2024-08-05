"use server"

import uomActions from "@/actions/inventory/uomActions"

export const getUOMs = async () => {
  
  const response = await uomActions.getAll() 
  

  return response 


}
