'use client'

import { FilledConsumerContainer } from "@/actions/accounting/consumerContainers/getAllByFillItem"
import { MbprByItem } from "@/actions/production/getMbprsByItem"
import { BatchSize } from "@/actions/production/mbpr/batchSizes/getAllByMbpr"
import { usePricingProducedActions, usePricingProducedSelection } from "@/store/pricingProducedSlice"
import { useEffect } from "react"
import { PricingBom, PricingBomObject } from "../_functions/getBomWithPricing"

type SetterProps = {
    activeMbpr: MbprByItem
    filledConsumerContainers: FilledConsumerContainer[]
    batchSizes: BatchSize[]
    bom: PricingBomObject
    tankLaborCost: number
}

const InitialStateSetter = ({
    activeMbpr,
    filledConsumerContainers,
    batchSizes,
    bom,
    tankLaborCost,
}: SetterProps) => {

    const {
        setActiveMbpr,
        setFilledConsumerContainers,
        setBatchSizes,
        setBomObject,
        setTankLaborFixedCost,
    } = usePricingProducedActions()



    useEffect(() => {
        setActiveMbpr(activeMbpr);
        setBatchSizes(batchSizes);
        setBomObject(bom)
        setTankLaborFixedCost(tankLaborCost)

    }, [activeMbpr])

    useEffect(() => {
        setFilledConsumerContainers(filledConsumerContainers);
    }, [filledConsumerContainers])

    return false
}

export default InitialStateSetter
