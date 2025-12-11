'use client'

import { useEffect } from "react"
import { InterimAuxiliaryItem } from "./StepAuxiliaries"
import { FinishedProductDetails } from "./StepFinishedProductDetails"
import { submitNewFinishedProduct } from "../../_functions/submitNewFinishedProduct"
import { usePricingPurchasedActions } from "@/store/pricingPurchasedSliceback"

type Props = {
  currentStep: number
  onReset: () => void;
  fillItemId: string
  finishedProductDetails: FinishedProductDetails | null
  auxiliaries: InterimAuxiliaryItem[]
}

const StepSubmission = ({ currentStep, fillItemId, finishedProductDetails, auxiliaries, onReset }: Props) => {

  const { refreshFinishedProducts } = usePricingPurchasedActions()


  useEffect(() => {

    if (currentStep !== 2) return;
    if (!fillItemId || !finishedProductDetails || auxiliaries.length === 0) {
      throw new Error('Some thing went wrong with the submission. Data is missing.')
    }



    const submit = async () => {
      try {
        await submitNewFinishedProduct(fillItemId, finishedProductDetails, auxiliaries);
      } catch (error) {
        console.error("Error:", error)
      } finally {
        refreshFinishedProducts(fillItemId);
        onReset()
      }

    }

    submit();
  }, [finishedProductDetails, auxiliaries, currentStep, fillItemId, onReset, refreshFinishedProducts])

  if (currentStep !== 2) { return false }

  return (
    <div className="flex w-52 flex-col gap-4">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>

  )
}

export default StepSubmission
