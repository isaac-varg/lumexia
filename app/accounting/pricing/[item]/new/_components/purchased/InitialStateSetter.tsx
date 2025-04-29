'use client'

import { FilledConsumerContainer } from "@/actions/accounting/consumerContainers/getAllByFillItem"
import { FinishedProduct } from "@/actions/accounting/finishedProducts/getByItem"
import { ItemPricingData } from "@/actions/accounting/pricing/getItemPricingData"
import { LastItemPrice } from "@/actions/accounting/pricing/getLastItemPrice"
import { getItemCost } from "@/app/accounting/pricing/_calculations/getItemCost"
import { usePricingPurchasedActions } from "@/store/pricingPurchasedSlice"
import { useEffect } from "react"

type InitialStateSetterProps = {
    lastPrice: LastItemPrice,
    pricingData: ItemPricingData,
    finishedProducts: FinishedProduct[]

}

const InitialStateSetter = ({ lastPrice, pricingData, finishedProducts }: InitialStateSetterProps) => {

    const { setState, setItemCost, setConsumercontainers } = usePricingPurchasedActions()

    useEffect(() => {
        setState({
            arrivalCost: pricingData?.arrivalCost || 0,
            unforeseenDifficultiesCost: pricingData?.unforeseenDifficultiesCost || 0,
            upcomingPrice: pricingData?.upcomingPrice || 0,
            upcomingPriceUom: pricingData?.upcomingPriceUom || null,
            upcomingPriceActive: pricingData?.isUpcomingPriceActive || false,
            lastPrice: lastPrice,
            productionUsageCost: pricingData?.productionUsageCost || 0,

        })
    }, [pricingData, lastPrice])

    useEffect(() => {
        setConsumercontainers(consumerContainers);
    }, [consumerContainers])

    useEffect(() => {
        const price = pricingData?.isUpcomingPriceActive ? pricingData.upcomingPrice : lastPrice?.pricePerUnit || 0

        const itemCost = getItemCost(price, pricingData?.arrivalCost || 0, pricingData?.unforeseenDifficultiesCost || 0)

        setItemCost(itemCost);
    }, [pricingData, lastPrice])


    return false;
}

export default InitialStateSetter
