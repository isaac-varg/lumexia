import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem'
import { MbprByItem, getMbprsByItem } from '@/actions/production/getMbprsByItem';
import { abort } from 'process';
import { create } from 'zustand';

export type InterimConsumerContainerData = {
    filledConsumerContainerId: string
    consumerPrice: number
    wasViewed: boolean
    profitPercentage: number

}

type State = {
    isContainerParametersPanelShown: boolean
    itemCost: number,
    filledConsumerContainers: FilledConsumerContainer[]
    interimConsumerContainers: InterimConsumerContainerData[]
    activeMbpr: MbprByItem | {}
}

//export type PricingProducedStates = keyof State
export type PricingPurchasedState = State; // alias for this state

type Actions = {
    actions: {
        setActiveMbpr: (mbpr: MbprByItem) => void,
        setFilledConsumerContainers: (containers: FilledConsumerContainer[]) => void,
    }
    //    actions: {
    //        setState: (data: { arrivalCost: number, unforeseenDifficultiesCost: number, upcomingPrice: number, upcomingPriceUom: Uom | null, upcomingPriceActive: boolean, lastPrice: LastItemPrice | null, productionUsageCost: number }) => void;
    //        setItemCost: (cost: number) => void;
    //        toggleContainerParameters: () => void;
    //        setConsumercontainers: (consumerContainers: FilledConsumerContainer[]) => void
    //        updateInterimConsumerContainer: (
    //            containerId: string,
    //            consumerPrice: number,
    //            wasViewed: boolean,
    //            profitPercentage: number,
    //        ) => void;
    //        getInterimConsumerContainer: (filledConsumerContainerId: string) => InterimConsumerContainerData | null;
    //    }
}


export const usePricingProducedSelection = create<State & Actions>((set, get) => ({
    isContainerParametersPanelShown: false,
    itemCost: 0,
    filledConsumerContainers: [],
    interimConsumerContainers: [],
    activeMbpr: {},

    actions: {
            setActiveMbpr: (mbpr ) => {
                set(() => ({
                    activeMbpr: mbpr    
                }))
            },
            setFilledConsumerContainers: (containers) => {
                set(() => ({
                    filledConsumerContainers: containers,
                }))
            }
        // setState: (data) => {
        //     const { arrivalCost, unforeseenDifficultiesCost, upcomingPriceActive, upcomingPrice, upcomingPriceUom, lastPrice, productionUsageCost } = data;
        //     set(() => ({
        //         arrivalCost,
        //         unforeseenDifficultiesCost,
        //         upcomingPrice,
        //         upcomingPriceUom,
        //         upcomingPriceActive,
        //         lastPrice,
        //         productionUsageCost,
        //     }));
        // },
    }
}));



export const usePricingProducedActions = () => usePricingProducedSelection((state) => state.actions) 
