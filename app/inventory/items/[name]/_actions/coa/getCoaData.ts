"use server"

import { getAllQcParametersByItemAndQcRecord } from "@/actions/quality/qc/parameters/getAllByItemAndQcRecord";
import { getConfigByGroup } from "@/actions/app/configs/getByGroup";

export const getCoaData = async (itemId: string, qcRecordId: string) => {
  const [parameters, companyData] = await Promise.all([
    getAllQcParametersByItemAndQcRecord(itemId, qcRecordId),
    getConfigByGroup("company"),
  ]);

  return { parameters, companyData };
};
