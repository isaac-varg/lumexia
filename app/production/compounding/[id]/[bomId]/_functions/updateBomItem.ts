"use server"

import bprBomActions from "@/actions/production/bprBom"

export const updateBomItem = async ( payload: any , bomItemId: string) => {

 const response = await bprBomActions.update({id: bomItemId}, payload) 



}
