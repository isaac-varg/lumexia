import { create } from 'zustand';

type State = {
    itemDetails: string
}

const panelDefaults = {
    itemDetails: "inventory",
}

export type PanelStates = keyof State

type Actions = {
    setPanelState: (panelStateName: PanelStates, value?: string) => void;
    getUserConfig: () => void;
}

export const usePanelSelection = create<State & Actions>((set) => ({
    itemDetails: "inventory",

    setPanelState: (panelStateName, value) => {

        const determinedValue = value ? value : panelDefaults[panelStateName]

        set((state) => ({
            ...state,
            [panelStateName]: determinedValue,
        }))
    },

    getUserConfig: () => (
        console.log("hey there mamasita")
    )



})) 
