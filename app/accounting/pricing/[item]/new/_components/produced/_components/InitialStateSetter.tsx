'use client'

import { FilledConsumerContainer } from "@/actions/accounting/consumerContainers/getAllByFillItem"
import { MbprByItem } from "@/actions/production/getMbprsByItem"
import { usePricingProducedActions } from "@/store/pricingProducedSlice"
import { useEffect } from "react"

type SetterProps = {
    activeMbpr: MbprByItem
    filledConsumerContainers: FilledConsumerContainer[]
}

const InitialStateSetter = ({ activeMbpr, filledConsumerContainers }: SetterProps) => {

    const { setActiveMbpr, setFilledConsumerContainers } = usePricingProducedActions()
    console.log(filledConsumerContainers)

    useEffect(() => {
        setActiveMbpr(activeMbpr)
    }, [activeMbpr])

    useEffect(() => {
        setFilledConsumerContainers(filledConsumerContainers);
    }, [filledConsumerContainers])


    return false
}

export default InitialStateSetter
