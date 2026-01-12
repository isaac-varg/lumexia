import { ErrorBase } from "@/utils/errors/ErrorBase";

export type PricingErrorName =
  | 'NULL_REFERENCE';

export interface PricingErrorData {
  nullReferenceIdentifier: string;
  error?: unknown;
}


export class PricingError extends ErrorBase<PricingErrorName, PricingErrorData> { }

