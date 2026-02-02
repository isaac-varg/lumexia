import { ErrorBase } from "@/utils/errors/ErrorBase";

export type BprConsumptionErrorName =
  | 'BPR_NOT_FOUND'
  | 'NO_STAGINGS_FOUND'
  | 'GET_STAGINGS_FAILED'
  | 'GET_USER_ID_FAILED'
  | 'TRANSACTION_FAILED';

export interface BprConsumptionErrorData {
  bprId?: string;
  referenceCode?: string;
  error?: unknown;
  failedStagings?: { lotId: string; itemName: string; quantity: number; uom: string }[];
}


export class BprConsumptionError extends ErrorBase<BprConsumptionErrorName, BprConsumptionErrorData> { }

