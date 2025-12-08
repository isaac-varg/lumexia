import { ErrorBase } from "@/utils/errors/ErrorBase";

export type BprConsumptionErrorName =
  | 'BPR_NOT_FOUND'
  | 'NO_STAGINGS_FOUND'
  | 'GET_STAGINGS_FAILED'
  | 'GET_USER_ID_FAILED'
  | 'TRANSACTION_FAILED';

export interface BprConsumptionErrorData {
  bprId?: string;
  error?: unknown;
}


export class BprConsumptionError extends ErrorBase<BprConsumptionErrorName, BprConsumptionErrorData> { }

