import { ErrorBase } from "@/utils/errors/ErrorBase";

export type PricingErrorName =
  | 'NULL_REFERENCE'
  | 'UOM_CONVERSION_FAILED';

export interface PricingErrorData {
  nullReferenceIdentifier?: string;
  error?: unknown;
  originalError?: unknown;
  priceSource?: string;
  purchaseOrderId?: string;
  purchaseOrderReferenceCode?: number;
  purchaseOrderItemId?: string;
  uomId?: string;
  uomName?: string;
  uomIsStandard?: boolean;
}


export class PricingError extends ErrorBase<PricingErrorName, PricingErrorData> { }

