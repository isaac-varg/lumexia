'use client'

import { useCompletedBprs } from "@/hooks/appQuery/useCompletedBprs"
import { usePricingQueue } from "@/hooks/appQuery/usePricingQueue"
import { usePricingReviews } from "@/hooks/appQuery/usePricingReviews"
import { usePurchasingReceivables } from "@/hooks/appQuery/usePurchasingReceivables"
import { usesPurchasingRequestsPollingQuery } from "@/hooks/appQuery/usePurchasingRequestsQuery"

const AppQuery = () => {

    usesPurchasingRequestsPollingQuery()
    usePurchasingReceivables()
    usePricingQueue()
    usePricingReviews()
    useCompletedBprs()
    

    return false
}

export default AppQuery
