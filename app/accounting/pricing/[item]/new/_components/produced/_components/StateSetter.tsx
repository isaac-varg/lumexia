'use client'

import { ActiveMbpr } from "@/actions/production/getActiveMbpr"
import { MbprByItem } from "@/actions/production/getMbprsByItem"
import { BatchSize } from "@/actions/production/mbpr/batchSizes/getAllByMbpr"
import useDialog from "@/hooks/useDialog"
import { usePricingProducedActions, usePricingProducedSelection } from "@/store/pricingProducedSlice"
import { useEffect } from "react"

type SetterProps = {
    activeMbpr: ActiveMbpr
    batchSizes: BatchSize[]
}

const StateSetter = ({
    activeMbpr,
    batchSizes,
}: SetterProps) => {

    const {
        setActiveMbpr,
        setBatchSizes,
        getProducedPricingSummations,
        getFinishedProducts,
    } = usePricingProducedActions()
    const { activeBatchSize, producedPricingSummations } = usePricingProducedSelection()
    const { showDialog } = useDialog()

    useEffect(() => {
        setActiveMbpr(activeMbpr);
        setBatchSizes(batchSizes);

    }, [activeMbpr, batchSizes])


    useEffect(() => {
        // recalcaulate bom when active batch sizes change;
        getProducedPricingSummations();

    }, [activeBatchSize, activeMbpr])



    useEffect(() => {
        if (producedPricingSummations && producedPricingSummations.isError) {
            showDialog('pricingError')
        }


        if (producedPricingSummations && !producedPricingSummations.isError) {
            getFinishedProducts()
        }


    }, [producedPricingSummations])


    return false
}

export default StateSetter 
