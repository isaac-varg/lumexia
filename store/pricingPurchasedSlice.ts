import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem';
import { LastItemPrice } from '@/actions/accounting/pricing/getLastItemPrice';
import { Uom } from '@/actions/inventory/getAllUom';
import { create } from 'zustand';

type State = {
    arrivalCost: number
    unforeseenDifficultiesCost: number
    upcomingPrice: number
    upcomingPriceUom: Uom | null
    upcomingPriceActive: boolean
    lastPrice: LastItemPrice | null
    itemCost: number,
    consumerContainers: FilledConsumerContainer[]
}

export type pricingPurchasedStates = keyof State

type Actions = {
    actions: {
        setState: (data: { arrivalCost: number, unforeseenDifficultiesCost: number, upcomingPrice: number, upcomingPriceUom: Uom | null, upcomingPriceActive: boolean, lastPrice: LastItemPrice | null }) => void;
        setItemCost: (cost: number) => void;
        setConsumercontainers: (consumerContainers: ItemConsumerContainer[]) => void
    }
}

export const usePricingPurchasedSelection = create<State & Actions>((set) => ({
    arrivalCost: 0,
    unforeseenDifficultiesCost: 0,
    upcomingPrice: 0,
    upcomingPriceUom: null,
    upcomingPriceActive: false,
    lastPrice: null,
    itemCost: 0,
    consumerContainers: [],


    actions: {
        setState: (data) => {
            const { arrivalCost, unforeseenDifficultiesCost, upcomingPriceActive, upcomingPrice, upcomingPriceUom, lastPrice } = data;
            set(() => ({
                arrivalCost,
                unforeseenDifficultiesCost,
                upcomingPrice,
                upcomingPriceUom,
                upcomingPriceActive,
                lastPrice,
            }))
        },
        setItemCost: (cost) => {
            set(() => ({ itemCost: cost, }))
        },
        setConsumercontainers: (consumerContainers) => {
            set(() => ({ consumerContainers, }))
        }

    }


}))

export const usePricingPurchasedActions = () => usePricingPurchasedSelection((state) => state.actions) 
