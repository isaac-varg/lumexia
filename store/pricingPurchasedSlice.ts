import { accountingActions } from '@/actions/accounting';
import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem'
import { FinishedProduct } from '@/actions/accounting/finishedProducts/getByItem';
import { FinishedProductFromPurchased } from '@/actions/accounting/finishedProducts/getByPurchasedItem';
import { ItemPricingData } from '@/actions/accounting/pricing/getItemPricingData';
import { LastItemPrice } from '@/actions/accounting/pricing/getLastItemPrice';
import { Uom } from '@/actions/inventory/getAllUom';
import prisma from '@/lib/prisma';
import { create } from 'zustand';

export type InterimFinishedProduct = {
    finishedProductId: string
    finishedProduct: FinishedProduct
    consumerPrice: number
    profit: number
    markup: number
    wasViewed: boolean
    profitPercentage: number

}

type State = {
    arrivalCost: number
    pricingDataObject: ItemPricingData | null
    unforeseenDifficultiesCost: number
    isContainerParametersPanelShown: boolean
    upcomingPrice: number
    upcomingPriceUom: Uom | null
    upcomingPriceActive: boolean
    lastPrice: LastItemPrice | null
    itemCost: number,
    finishedProducts: FinishedProductFromPurchased[]
    interimFinishedProducts: InterimFinishedProduct[]
    productionUsageCost: number
}

//export type pricingPurchasedStates = keyof State
export type PricingPurchasedState = State; // alias for this state

type Actions = {
    actions: {
        setState: (data: { arrivalCost: number, unforeseenDifficultiesCost: number, upcomingPrice: number, upcomingPriceUom: Uom | null, upcomingPriceActive: boolean, lastPrice: LastItemPrice | null, productionUsageCost: number, pricingDataObject: ItemPricingData }) => void;
        setItemCost: (cost: number) => void;
        toggleContainerParameters: () => void;
        setFinishedProducts: (finishedProducts: FinishedProductFromPurchased[]) => void
        updateInterimFinishedProduct: (interimFinishedProductPayload: InterimFinishedProduct) => void;
        getInterimFinishedProduct: (finishedProductId: string) => InterimFinishedProduct | null;
        refreshFinishedProducts: (fillItemId: string) => void;
    }
}


export const usePricingPurchasedSelection = create<State & Actions>((set, get) => ({
    arrivalCost: 0,
    pricingDataObject: null,
    unforeseenDifficultiesCost: 0,
    isCalculationsPanelShown: false,
    isContainerParametersPanelShown: false,
    upcomingPrice: 0,
    upcomingPriceUom: null,
    upcomingPriceActive: false,
    lastPrice: null,
    itemCost: 0,
    finishedProducts: [],
    interimFinishedProducts: [],
    productionUsageCost: 0,

    actions: {
        setState: (data) => {
            const { arrivalCost, unforeseenDifficultiesCost, upcomingPriceActive, upcomingPrice, upcomingPriceUom, lastPrice, productionUsageCost, pricingDataObject } = data;
            set(() => ({
                arrivalCost,
                unforeseenDifficultiesCost,
                upcomingPrice,
                upcomingPriceUom,
                upcomingPriceActive,
                lastPrice,
                productionUsageCost,
                pricingDataObject
            }));
        },
        setItemCost: (cost) => {
            set(() => ({ itemCost: cost }));
        },
        setFinishedProducts: (finishedProducts) => {
            set(() => ({ finishedProducts, }));
        },

        updateInterimFinishedProduct: (interimFinishedProductPayload) => {
            set((state) => {
                const existingIndex = state.interimFinishedProducts.findIndex(
                    (c) => c.finishedProductId === interimFinishedProductPayload.finishedProductId
                );

                if (existingIndex !== -1) {
                    // Update existing container
                    const updatedFinishedProducts = [...state.interimFinishedProducts];
                    updatedFinishedProducts[existingIndex] = interimFinishedProductPayload

                    return { interimFinishedProducts: updatedFinishedProducts };
                } else {
                    // Add new container
                    return {
                        interimFinishedProducts: [
                            ...state.interimFinishedProducts,
                            interimFinishedProductPayload,
                        ],
                    };
                }
            });
        },
        getInterimFinishedProduct: (finishedProductId) => {
            const state = get();
            return (
                state.interimFinishedProducts.find(
                    (c) => c.finishedProductId === finishedProductId
                ) || null
            );
        },
        toggleContainerParameters: () => {
            set((state) => ({ isContainerParametersPanelShown: !state.isContainerParametersPanelShown }))
        },
        refreshFinishedProducts: async (fillItemId) => {
            const state = get()
            try {

                const finishedProducts = await accountingActions.finishedProducts.getByPurchasedItem(fillItemId, state.pricingDataObject, state.lastPrice);
                set(() => ({
                    finishedProducts,
                }))

            } catch (error) {

                console.error('There was an issue retrieving the finished products', error)
            }
        }
    },
}));



export const usePricingPurchasedActions = () => usePricingPurchasedSelection((state) => state.actions) 
