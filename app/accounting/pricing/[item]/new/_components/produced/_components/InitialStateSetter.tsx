'use client'

import { FilledConsumerContainer } from "@/actions/accounting/consumerContainers/getAllByFillItem"
import { MbprByItem } from "@/actions/production/getMbprsByItem"
import { BatchSize } from "@/actions/production/mbpr/batchSizes/getAllByMbpr"
import { usePricingProducedActions, usePricingProducedSelection } from "@/store/pricingProducedSlice"
import { useEffect } from "react"
import { PricingBom } from "../_functions/getBomWithPricing"

type SetterProps = {
    activeMbpr: MbprByItem
    filledConsumerContainers: FilledConsumerContainer[]
    batchSizes: BatchSize[]
    bom: PricingBom[]
}

const InitialStateSetter = ({
    activeMbpr,
    filledConsumerContainers,
    batchSizes,
    bom,
}: SetterProps) => {

    const {
        setActiveMbpr,
        setFilledConsumerContainers,
        setBatchSizes,
        setBom,
    } = usePricingProducedActions()


    const {
        
    } = usePricingProducedSelection()

    useEffect(() => {
        setActiveMbpr(activeMbpr);
        setBatchSizes(batchSizes);
        setBom(bom);

    }, [activeMbpr])

    useEffect(() => {
        setFilledConsumerContainers(filledConsumerContainers);
    }, [filledConsumerContainers])

    return false
}

export default InitialStateSetter
