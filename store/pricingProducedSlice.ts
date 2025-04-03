import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem'
import { MbprByItem, getMbprsByItem } from '@/actions/production/getMbprsByItem';
import { BatchSize } from '@/actions/production/mbpr/batchSizes/getAllByMbpr';
import { PricingBom } from '@/app/accounting/pricing/[item]/new/_components/produced/_functions/getBomWithPricing';
import { staticRecords } from '@/configs/staticRecords';
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
    activeMbpr: MbprByItem | null
    activeBatchSize: BatchSize | null
    batchSizes: BatchSize[]
    bom: PricingBom[]
    bomCost: number
}

//export type PricingProducedStates = keyof State
export type PricingPurchasedState = State; // alias for this state

type Actions = {
    actions: {
        setActiveMbpr: (mbpr: MbprByItem) => void,
        setFilledConsumerContainers: (containers: FilledConsumerContainer[]) => void,
        setBatchSizes: (batchSizes: BatchSize[]) => void;
        setBom: (bom: PricingBom[]) => void;
        setBomCost: (cost: number) => void;
    }
}


export const usePricingProducedSelection = create<State & Actions>((set, get) => ({
    isContainerParametersPanelShown: false,
    itemCost: 0,
    filledConsumerContainers: [],
    interimConsumerContainers: [],
    activeMbpr: null,
    activeBatchSize: null,
    batchSizes: [],
    bom: [],
    bomCost: 0,


    actions: {
        setActiveMbpr: (mbpr) => {
            set(() => ({
                activeMbpr: mbpr
            }))
        },
        setFilledConsumerContainers: (containers) => {
            set(() => ({
                filledConsumerContainers: containers,
            }))
        },
        setBatchSizes: (batchSizes) => {
            const active = batchSizes.filter((bs) => bs.recordStatusId === staticRecords.app.recordStatuses.active);
            set(() => ({ batchSizes, }))
            set(() => ({ activeBatchSize: active[0] }))
        },
        setBom: (bom) => {
            set(() => ({ bom, }))
        },
        setBomCost: (cost) => {
            set(() => ({ bomCost: cost }))
        }

    }
}));



export const usePricingProducedActions = () => usePricingProducedSelection((state) => state.actions) 
