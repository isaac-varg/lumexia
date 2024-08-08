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
