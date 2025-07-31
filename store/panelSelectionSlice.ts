import { PoViewModes } from '@/app/purchasing/purchase-orders/[purchaseOrder]/_components/viewMode/ViewMode';
import { create } from 'zustand';

type State = {
    itemDetails: string
    productionItemDetails: string
    supplierDetails: string
    requestInventory: string
    poViewMode: PoViewModes
    purchaseOrder: 'main' | 'accounting'
    requestDashboard: 'all' | 'new'
    planningDashboard: 'byStatus' | 'byTable'
}

const panelDefaults: State = {
    itemDetails: "inventory",
    productionItemDetails: 'inventory',
    supplierDetails: 'purchases',
    requestInventory: 'current',
    poViewMode: 'table',
    requestDashboard: 'all',
    planningDashboard: 'byStatus',
    purchaseOrder: 'main',
}

export type PanelStates = keyof State

type Actions = {
    actions: {
        setPanelState: (panelStateName: PanelStates, value?: string) => void;
    }
}

export const usePanelSelection = create<State & Actions>((set) => ({
    itemDetails: "inventory",
    productionItemDetails: "inventory",
    supplierDetails: 'purchases',
    requestInventory: 'current',
    poViewMode: 'table',
    requestDashboard: 'all',
    planningDashboard: 'byStatus',
    purchaseOrder: 'main',

    actions: {
        setPanelState: (panelStateName, value) => {
            const determinedValue = value ? value : panelDefaults[panelStateName]
            set(() => ({
                [panelStateName]: determinedValue,
            }))
        },
    }

}))

export const usePanelActions = () => usePanelSelection((state) => state.actions) 
