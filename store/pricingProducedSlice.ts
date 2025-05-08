import { FinishedProduct } from '@/actions/accounting/finishedProducts/getByItem';
import { getActiveMbpr } from '@/actions/production/getActiveMbpr';
import { MbprByItem } from '@/actions/production/getMbprsByItem';
import { BatchSize } from '@/actions/production/mbpr/batchSizes/getAllByMbpr';
import { getBomPricingSummations } from '@/app/accounting/pricing/[item]/new/_components/produced/_functions/getBomPricingSummations';
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
    isLoading: boolean
}
//export type PricingProducedStates = keyof State
export type PricingProducedState = State; // alias for this state

type Actions = {
    actions: {
        setActiveMbpr: (mbpr: MbprByItem) => void,
        setBatchSizes: (batchSizes: BatchSize[]) => void;
        toggleContainerParameters: () => void;
        getProducedPricingSummations: () => void;
    }

}


export const usePricingProducedSelection = create<State & Actions>((set, get) => ({
    isContainerParametersPanelShown: false,
    activeMbpr: null,
    activeBatchSize: null,
    batchSizes: [],
    isLoading: false,
    producedPricingSummations: null,


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
        toggleContainerParameters: () => {
            set((state) => ({ isContainerParametersPanelShown: !state.isContainerParametersPanelShown }))
        },
        getProducedPricingSummations: async () => {

            const state = get()

            if (!state.activeMbpr) { throw new Error('No active MBPR.') }

            try {
                set(() => ({ isLoading: true }))
                const summations = await getBomWithPricing(state.activeMbpr.id)
                set(() => ({
                    producedPricingSummations: summations
                }))
            } catch (error) {
                throw new Error(`Something went wrong when getting the summations: ${error}`)
            } finally {
                
                set(() => ({ isLoading: false }))
            }


        }
    }
}));




export const usePricingProducedActions = () => usePricingProducedSelection((state) => state.actions) 
