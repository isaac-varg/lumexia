import { ErrorBase } from "@/utils/errors/ErrorBase";

export type BprConsumptionErrorName =
  | 'BPR_NOT_FOUND'
  | 'NO_STAGINGS_FOUND'

export interface BprConsumptionErrorData {

}


export class BprConsumptionError extends ErrorBase<BprConsumptionErrorName, BprConsumptionErrorData> { }

