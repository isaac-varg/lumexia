import { create } from 'zustand';

type State = {
    isOpen: boolean
    
}

export type commandPalletStates = keyof State

type Actions = {
    actions: {
        togglePallet: () => void;
    }
}

export const useCommandPalletSelection = create<State & Actions>((set) => ({
    isOpen: false,

    actions: {
        togglePallet: () => {
            set((state) => ({
                isOpen: !state.isOpen
            }))
        }
    }


}))

export const useCommandPalletActions = () => useCommandPalletSelection((state) => state.actions) 
