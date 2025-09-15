// this is providing a string. 
// i made hte other utility that basically does the same thing to 
// avoid converting to and from string to maybe avoid floating point precision errors

import { fractionalDigits } from "@/configs/data/fractionalDigits"

export const toFracitonalDigits = {
  curreny: (value: number, useThousandSeparator = true) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: fractionalDigits.currency,
      maximumFractionDigits: fractionalDigits.currency,
      useGrouping: useThousandSeparator,
    });
  },
  weight: (value: number, useThousandSeparator = true) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: fractionalDigits.weight,
      maximumFractionDigits: fractionalDigits.weight,
      useGrouping: useThousandSeparator,
    });
  },
  digits: (value: number, digits: number, useThousandSeparator = true) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
      useGrouping: useThousandSeparator,
    });
  }
}
