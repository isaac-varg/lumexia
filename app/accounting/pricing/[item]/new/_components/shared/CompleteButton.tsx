'use client'

import { usePricingSharedSelection } from "@/store/pricingSharedSlice"
import { usePricingProducedSelection } from "@/store/pricingProducedSlice"
import { usePricingPurchasedSelection } from "@/store/pricingPurchasedSlice"
import { handleCompleteMain } from "../../_actions/complete/handleCompleteMain"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CompleteButton = () => {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const { 
    examId, 
    isProduced, 
    finishedProducts, 
    processedFinishedProducts, 
    interimFinishedProductData, 
    totalCostPerLb 
  } = usePricingSharedSelection()
  
  const { activeMbpr, pricingData: producedPricingData } = usePricingProducedSelection()
  const { pricingData: purchasedPricingData } = usePricingPurchasedSelection()

  const handleComplete = async () => {
    if (isPending) return;
    setIsPending(true);

    try {
        // Convert Maps to Objects for server action
        const processedFinishedProductsObj = Object.fromEntries(processedFinishedProducts)
        const interimDataObj = Object.fromEntries(interimFinishedProductData)

        const result = await handleCompleteMain({
            examinationId: examId,
            isProduced,
            mbprId: activeMbpr?.id,
            producedPricingData: producedPricingData || undefined,
            purchasedPricingData: purchasedPricingData || undefined,
            finishedProducts: finishedProducts || [],
            processedFinishedProducts: processedFinishedProductsObj as any,
            interimData: interimDataObj,
            totalCostPerLb
        })

        if (result.success) {
            router.push('/accounting/pricing')
            router.refresh()
        } else {
            alert("Error completing: " + result.error)
        }
    } catch (error) {
        console.error(error)
        alert("An unexpected error occurred.")
    } finally {
        setIsPending(false);
    }
  }

  return (
    <button
      className={`btn btn-success btn-lg ${isPending ? 'loading' : ''}`}
      onClick={handleComplete}
      disabled={isPending}
    >
      {isPending ? 'Completing...' : 'Complete'}
    </button>

  )
}

export default CompleteButton
