'use client'

import { FinishedProductFromPurchased } from "@/actions/accounting/finishedProducts/getByPurchasedItem"
import { ItemPricingData } from "@/actions/accounting/pricing/getItemPricingData"
import { LastItemPrice } from "@/actions/accounting/pricing/getLastItemPrice"
import { getItemCost } from "@/app/accounting/pricing/_calculations/getItemCost"
import { usePricingPurchasedActions } from "@/store/pricingPurchasedSlice"
import { useEffect } from "react"

type InitialStateSetterProps = {
    lastPrice: LastItemPrice,
    pricingData: ItemPricingData,
    finishedProducts: FinishedProductFromPurchased[]

}

const InitialStateSetter = ({ lastPrice, pricingData, finishedProducts }: InitialStateSetterProps) => {

    const { setState, setItemCost, setFinishedProducts } = usePricingPurchasedActions()

    useEffect(() => {
        setState({
            arrivalCost: pricingData?.arrivalCost || 0,
            unforeseenDifficultiesCost: pricingData?.unforeseenDifficultiesCost || 0,
            upcomingPrice: pricingData?.upcomingPrice || 0,
            upcomingPriceUom: pricingData?.upcomingPriceUom || null,
            upcomingPriceActive: pricingData?.isUpcomingPriceActive || false,
            lastPrice: lastPrice,
            pricingDataObject: pricingData,
            productionUsageCost: pricingData?.productionUsageCost || 0,

        })
    }, [pricingData, lastPrice, setState])

    useEffect(() => {
        setFinishedProducts(finishedProducts);
    }, [finishedProducts, setFinishedProducts])

    useEffect(() => {

        if (!pricingData) return;

        const itemCost = getItemCost(pricingData, lastPrice)

        setItemCost(itemCost);
    }, [pricingData, lastPrice, setItemCost])




    return false;
}

export default InitialStateSetter
