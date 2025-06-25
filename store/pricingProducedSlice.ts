import { accountingActions } from '@/actions/accounting';
import { FinishedProduct } from '@/actions/accounting/finishedProducts/getByItem';
import { FinishedProductFromProduced } from '@/actions/accounting/finishedProducts/getByProducedItem';
import { FinishedProductFromPurchased } from '@/actions/accounting/finishedProducts/getByPurchasedItem';
import { MbprByItem } from '@/actions/production/getMbprsByItem';
import { BatchSize } from '@/actions/production/mbpr/batchSizes/getAllByMbpr';
import { BatchSummations } from '@/app/accounting/pricing/[item]/new/_components/produced/_functions/getBomPricingSummations';
import { ProducedPricingSummations, getBomWithPricing } from '@/app/accounting/pricing/[item]/new/_components/produced/_functions/getBomWithPricing';
import { staticRecords } from '@/configs/staticRecords';
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
    isContainerParametersPanelShown: boolean
    activeMbpr: MbprByItem | null
    activeBatchSize: BatchSize | null
    batchSizes: BatchSize[]
    producedPricingSummations: ProducedPricingSummations | null
    finishedProducts: FinishedProductFromProduced[]
    interimFinishedProducts: InterimFinishedProduct[]
    selectedBomRow: BatchSummations['bomWithCost'][number] | null
    selectedFinishedProduct: FinishedProductFromPurchased | null
}
//export type PricingProducedStates = keyof State
export type PricingProducedState = State; // alias for this state

type Actions = {
    actions: {
        setActiveMbpr: (mbpr: MbprByItem) => void,
        setBatchSizes: (batchSizes: BatchSize[]) => void;
        setSelectedBomRow: (row?: BatchSummations['bomWithCost'][number]) => void;
        toggleContainerParameters: () => void;
        getProducedPricingSummations: () => void;
        getFinishedProducts: () => void;
        updateInterimFinishedProduct: (interimFinishedProductPayload: InterimFinishedProduct) => void;
        getInterimFinishedProduct: (finishedProductId: string) => InterimFinishedProduct | null;
        setSelectedFinishedProduct: (finishedProudct: FinishedProduct | null) => void;



    }

}


export const usePricingProducedSelection = create<State & Actions>((set, get) => ({
    isContainerParametersPanelShown: false,
    activeMbpr: null,
    activeBatchSize: null,
    batchSizes: [],
    producedPricingSummations: null,
    finishedProducts: [],
    interimFinishedProducts: [],
    selectedBomRow: null,
    selectedFinishedProduct: null,



    actions: {
        setActiveMbpr: (mbpr) => {
            set(() => ({
                activeMbpr: mbpr
            }))
        },
        setBatchSizes: (batchSizes) => {
            const active = batchSizes.filter((bs) => bs.recordStatusId === staticRecords.app.recordStatuses.active);
            set(() => ({ batchSizes, }))
            set(() => ({ activeBatchSize: active[0] }))
        },
        setSelectedBomRow: (row) => {
            if (row) {
                set(() => ({ selectedBomRow: row }))
            } else {
                set(() => ({ selectedBomRow: null }))
            }
        },
        setSelectedFinishedProduct: (finishedProduct) => {
            set(() => ({ selectedFinishedProduct: finishedProduct }))
        },
        toggleContainerParameters: () => {
            set((state) => ({ isContainerParametersPanelShown: !state.isContainerParametersPanelShown }))
        },
        getProducedPricingSummations: async () => {

            const state = get()

            if (!state.activeMbpr) { throw new Error('No active MBPR.') }

            try {
                const summations = await getBomWithPricing(state.activeMbpr.id)
                set(() => ({
                    producedPricingSummations: summations
                }))
            } catch (error) {
                console.error(`Something went wrong when getting the summations: ${error}`)
            }

        },
        getFinishedProducts: async () => {
            const { producedPricingSummations, activeMbpr } = get();

            const summations = producedPricingSummations as BatchSummations

            if (!producedPricingSummations || !activeMbpr) { throw new Error('No summation data present') }

            try {

                const finishedProducts = await accountingActions.finishedProducts.getByProducedItem(activeMbpr.producesItemId, summations)

                set(() => ({
                    finishedProducts,
                }))

            } catch (error) {
                console.error(`Something went wrong with getting the finished products: ${error}`)
            }
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
    }
}));




export const usePricingProducedActions = () => usePricingProducedSelection((state) => state.actions) 
