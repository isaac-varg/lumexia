"use server"

import recordStatusActions from "@/actions/app/recordStatusActions"
import { RecordStatus } from "@/types/recordStatus";
import { toProperCase } from "../data/toProperCase";

export const getRecordStatuses = async (mode?: 'data' | 'selectOption') => {
  
  const data = await recordStatusActions.getAll();

  if (mode === 'selectOption') {
    return data.map((rs: RecordStatus) => ({label: toProperCase(rs.name), value: rs.id}))
  } 

  return data;

}
