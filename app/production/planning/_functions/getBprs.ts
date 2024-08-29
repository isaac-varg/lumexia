"use server"
import bprActions from "@/actions/production/bprActions"

export const getBprs = async ( ) => {

 const bprs = await bprActions.getAll();

 return bprs

}
