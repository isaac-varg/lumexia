import { accountingActions } from '@/actions/accounting';
import { ConsumerContainer } from '@/actions/accounting/consumerContainers/getAll';
import { PackagingItem } from '@/actions/accounting/consumerContainers/getPackagingItems';
import { inventoryActions } from '@/actions/inventory';
import { Uom } from '@/types/uom';
import { create } from 'zustand';

type State = {
    consumerContainers: ConsumerContainer[];
    packagingItems: PackagingItem[];
    uoms: Uom[]

}

export type pricingSharedStates = keyof State

type Actions = {
    actions: {
        getAllConsumerContainers: () => void;
        getPackagingItems: () => void;
        getUoms: () => void;
    }
}

export const usePricingSharedSelection = create<State & Actions>((set) => ({
    consumerContainers: [],
    packagingItems: [],
    uoms: [],

    actions: {
        getAllConsumerContainers: async () => {
            try {
                const consumerContainers = await accountingActions.consumerContainers.getAll();
                set(() => ({
                    consumerContainers,
                }))
            } catch (error) {
                console.error("There was an error fetching containers", error)
            }
        },
        getPackagingItems: async () => {
            try {
                const packagingItems = await accountingActions.consumerContainers.getPackagingItems();
                set(() => ({
                    packagingItems
                }))
            } catch (error) {
                console.error("There was an error fetching packaging items", error)
            }
        },
        getUoms: async () => {
            try {
                const uoms = await inventoryActions.uom.getAll();
                set(() => ({uoms,}))
            } catch (error) {
                console.error("There was an error fetching uoms", error)
            }
        }
    }


}))

export const usePricingSharedActions = () => usePricingSharedSelection((state) => state.actions) 
