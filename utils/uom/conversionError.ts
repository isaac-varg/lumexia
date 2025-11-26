import { ErrorBase } from "../errors/ErrorBase";

export type UomConversionErrorName =
  | 'MISSING_OUTPUT_UOM'
  | 'ITEM_NOT_FOUND'
  | 'STANDARD_CONVERSION_NOT_FOUND'
  | 'DISCRETE_CONVERSION_NOT_FOUND'

export interface ConversionErrorData {

}


export class UomConversionError extends ErrorBase<UomConversionErrorName, ConversionErrorData> { }

