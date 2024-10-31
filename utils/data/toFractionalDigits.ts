// this is providing a string. 
// i made hte other utility that basically does the same thing to 
// avoid converting to and from string to maybe avoid floating point precision errors

import { fractionalDigits } from "@/configs/data/fractionalDigits"

export const toFracitonalDigits = {
  curreny: (value: number) => {
    return value.toFixed(fractionalDigits.currency);
  },
  weight: (value: number) => {
    return value.toFixed(fractionalDigits.weight);
  },
  digits: (value: number, digits: number) => {
    return value.toFixed(digits)
  }
}
