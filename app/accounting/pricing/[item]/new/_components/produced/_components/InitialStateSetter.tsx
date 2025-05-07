'use client'

import { FilledConsumerContainer } from "@/actions/accounting/consumerContainers/getAllByFillItem"
import { MbprByItem } from "@/actions/production/getMbprsByItem"
import { BatchSize } from "@/actions/production/mbpr/batchSizes/getAllByMbpr"
import { usePricingProducedActions, usePricingProducedSelection } from "@/store/pricingProducedSlice"
import { useEffect } from "react"
import { PricingBom, PricingBomObject } from "../_functions/getBomWithPricing"

type SetterProps = {
    activeMbpr: MbprByItem
    batchSizes: BatchSize[]
}

const InitialStateSetter = ({
    activeMbpr,
    batchSizes,
}: SetterProps) => {

    const {
        setActiveMbpr,
        setBatchSizes,
    } = usePricingProducedActions()

    const { activeBatchSize } = usePricingProducedSelection()

    useEffect(() => {
        setActiveMbpr(activeMbpr);
        setBatchSizes(batchSizes);

    }, [activeMbpr, batchSizes])


    useEffect(() => {
        // recalcaulate bom when active batch sizes change;

    }, [activeBatchSize])


    return false
}

export default InitialStateSetter
