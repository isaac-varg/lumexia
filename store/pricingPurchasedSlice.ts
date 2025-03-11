import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem'
import { LastItemPrice } from '@/actions/accounting/pricing/getLastItemPrice';
import { Uom } from '@/actions/inventory/getAllUom';
import { create } from 'zustand';

export type InterimConsumerContainerData = {
    filledConsumerContainerId: string
    consumerPrice: number

}

type State = {
    arrivalCost: number
    unforeseenDifficultiesCost: number
    isCalculationsPanelShown: boolean
    isContainerParametersPanelShown: boolean
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
        toggleCalculations: () => void;
        toggleContainerParameters: () => void;
        setConsumercontainers: (consumerContainers: FilledConsumerContainer[]) => void
        updateInterimConsumerContainer: (
            containerId: string,
            consumerPrice: number,
        ) => void;
        getInterimConsumerContainer: (filledConsumerContainerId: string) => InterimConsumerContainerData | null;
    }
}


export const usePricingPurchasedSelection = create<State & Actions>((set, get) => ({
    arrivalCost: 0,
    unforeseenDifficultiesCost: 0,
    isCalculationsPanelShown: false,
    isContainerParametersPanelShown: false,
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

        updateInterimConsumerContainer: (containerId, consumerPrice) => {
            set((state) => {
                const existingIndex = state.interimConsumerContainers.findIndex(
                    (c) => c.filledConsumerContainerId === containerId
                );

                if (existingIndex !== -1) {
                    // Update existing container
                    const updatedContainers = [...state.interimConsumerContainers];
                    updatedContainers[existingIndex] = {
                        ...updatedContainers[existingIndex],
                        consumerPrice,
                    };
                    return { interimConsumerContainers: updatedContainers };
                } else {
                    // Add new container
                    return {
                        interimConsumerContainers: [
                            ...state.interimConsumerContainers,
                            { filledConsumerContainerId: containerId, consumerPrice },
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
        toggleCalculations: () => {
            set((state) => ({ isCalculationsPanelShown: !state.isCalculationsPanelShown }))
        },
        toggleContainerParameters: () => {
            set((state) => ({ isContainerParametersPanelShown: !state.isContainerParametersPanelShown }))
        }
    },
}));



export const usePricingPurchasedActions = () => usePricingPurchasedSelection((state) => state.actions) 
