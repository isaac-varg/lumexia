import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem';
import { LastItemPrice } from '@/actions/accounting/pricing/getLastItemPrice';
import { Uom } from '@/actions/inventory/getAllUom';
import { create } from 'zustand';

export type InterimConsumerContainerData = {
    filledConsumerContainerId: string
    consumerPrice: number
    markup: number
    profit: number
    profitPercentage: number

}

type State = {
    arrivalCost: number
    unforeseenDifficultiesCost: number
    upcomingPrice: number
    upcomingPriceUom: Uom | null
    upcomingPriceActive: boolean
    lastPrice: LastItemPrice | null
    itemCost: number,
    consumerContainers: FilledConsumerContainer[]
    interimConsumerContainers: InterimConsumerContainerData[]
}

export type pricingPurchasedStates = keyof State

type Actions = {
    actions: {
        setState: (data: { arrivalCost: number, unforeseenDifficultiesCost: number, upcomingPrice: number, upcomingPriceUom: Uom | null, upcomingPriceActive: boolean, lastPrice: LastItemPrice | null }) => void;
        setItemCost: (cost: number) => void;
        setConsumercontainers: (consumerContainers: FilledConsumerContainer[]) => void
        updateInterimConsumerContainers: (filledConsumerContainerId: string, data: InterimConsumerContainerData) => void;
        getInterimConsumerContainer: (filledConsumerContainerId: string) => InterimConsumerContainerData | null;
    }
}


export const usePricingPurchasedSelection = create<State & Actions>((set, get) => ({
    arrivalCost: 0,
    unforeseenDifficultiesCost: 0,
    upcomingPrice: 0,
    upcomingPriceUom: null,
    upcomingPriceActive: false,
    lastPrice: null,
    itemCost: 0,
    consumerContainers: [],
    interimConsumerContainers: [],

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
            }));
        },
        setItemCost: (cost) => {
            set(() => ({ itemCost: cost }));
        },
        setConsumercontainers: (consumerContainers) => {
            set(() => ({ consumerContainers }));
        },
        updateInterimConsumerContainers: (filledConsumerContainerId, data) => {
            set((state) => {
                const existingIndex = state.interimConsumerContainers.findIndex(
                    (c) => c.filledConsumerContainerId === filledConsumerContainerId
                );

                if (existingIndex !== -1) {
                    // Update existing entry
                    return {
                        interimConsumerContainers: state.interimConsumerContainers.map((c, index) =>
                            index === existingIndex ? { ...c, ...data } : c
                        ),
                    };
                } else {
                    // Add new entry
                    return {
                        interimConsumerContainers: [
                            ...state.interimConsumerContainers,
                            { ...data, filledConsumerContainerId },
                        ],
                    };
                }
            });
        },
        getInterimConsumerContainer: (filledConsumerContainerId) => {
            const state = get();
            return (
                state.interimConsumerContainers.find(
                    (c) => c.filledConsumerContainerId === filledConsumerContainerId
                ) || null
            );
        },
    },
}));



export const usePricingPurchasedActions = () => usePricingPurchasedSelection((state) => state.actions) 
