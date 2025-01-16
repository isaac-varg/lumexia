import { create } from 'zustand';

type State = {
    itemDetails: string
    productionItemDetails: string
    supplierDetails: string
}

const panelDefaults = {
    itemDetails: "inventory",
    productionItemDetails: 'inventory',
    supplierDetails: 'purchases',
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

    actions: {
        setPanelState: (panelStateName, value) => {
            const determinedValue = value ? value : panelDefaults[panelStateName]
            set(() => ({
                [panelStateName]: determinedValue,
            }))
        },
    }


})) 

export const usePanelActions = () => usePanelSelection((state) => state.actions ) 
