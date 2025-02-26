import { inventoryActions } from '@/actions/inventory';
import { Item } from '@/actions/inventory/getAllItems';
import { create } from 'zustand';

type State = {
    isOpen: boolean
    items: Item[]

}

export type commandPalletStates = keyof State

type Actions = {
    actions: {
        togglePallet: () => void;
        getItems: () => void
    }
}

export const useCommandPalletSelection = create<State & Actions>((set) => ({
    isOpen: false,
    items: [],

    actions: {
        togglePallet: () => {
            set((state) => ({
                isOpen: !state.isOpen
            }))
        },
        getItems: async () => {
            try {
                const items = await inventoryActions.items.getAll(true);
                set(() => ({
                    items,
                }))
            } catch (error) {
                console.error("There was an error fetching items", error)
            }
        }
    }


}))

export const useCommandPalletActions = () => useCommandPalletSelection((state) => state.actions) 
