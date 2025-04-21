'use client'

import { usesPurchasingRequestsPollingQuery } from "@/hooks/appQuery/usePurchasingRequestsQuery"

const AppQuery = () => {

    usesPurchasingRequestsPollingQuery()
    return false
}

export default AppQuery
