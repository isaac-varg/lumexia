'use server'

import { uomUtils } from ".";
import { UomConversionError } from "./conversionError";
import { ConversionIO } from "./convert";

type ConversionValidation = {
  isSuccessful: boolean,
  error?: UomConversionError,
}

export const validateConversion = async (inputUom: ConversionIO, outputUom: ConversionIO, supplierId: string, itemId: string): Promise<ConversionValidation> => {

  try {
    await uomUtils.convert(
      inputUom,
      1,
      outputUom,
      itemId,
      supplierId,
    );

    // if there is no error then it was successful
    return {
      isSuccessful: true,
    }

  } catch (error) {
    if (error instanceof UomConversionError) {
      return {
        isSuccessful: false,
        error,
      };
    }

    return {
      isSuccessful: false,
      error: error as UomConversionError,
    }
  }
};
