'use client'

import { usePricingQueue } from "@/hooks/appQuery/usePricingQueue"
import { usePurchasingReceivables } from "@/hooks/appQuery/usePurchasingReceivables"
import { usesPurchasingRequestsPollingQuery } from "@/hooks/appQuery/usePurchasingRequestsQuery"

const AppQuery = () => {

    usesPurchasingRequestsPollingQuery()
    usePurchasingReceivables()
    usePricingQueue()

    return false
}

export default AppQuery
