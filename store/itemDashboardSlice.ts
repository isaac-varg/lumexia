import { inventoryActions } from '@/actions/inventory';
import { SingleItem } from '@/actions/inventory/getOneItem';
import { qualityActions } from '@/actions/quality';
import { QcItemParameter } from '@/actions/quality/qc/parameters/getAllByItem';
import { create } from 'zustand';

type State = {
    item: SingleItem | null
    itemParameters: QcItemParameter[]
    isItemParametersFetched: boolean;
    itemParametersPanelMode: "view" | "add";

}

export type itemDashboardStates = keyof State

type Actions = {
    actions: {
        getItem: (id: string) => void;
        getQcItemParameters: () => void;
        setItemParametersPanelMode: (mode: "view" | "add") => void;
        setIsItemParametersFetched: (fetched: boolean) => void;
    }
}

export const useItemDashboardSelection = create<State & Actions>((set, get) => ({
    item: null,
    itemParameters: [],
    isItemParametersFetched: false,
    itemParametersPanelMode: 'view',

    actions: {
        getItem: async (id) => {
            try {

                const item = await inventoryActions.items.getOne(id)
                set(() => ({ item, }))
            } catch (error) {
                console.error(error)
                throw new Error("Could not retrieve item")
            }

        },

        getQcItemParameters: async () => {
            try {
                const { item } = get()

                if (!item) {
                    return;
                };

                const parameters = await qualityActions.qc.itemParameters.getByItem(item.id)
                set(() => ({ itemParameters: parameters }))
            } catch (error) {
                console.error(error);
            } finally {
                set(() => ({
                    isItemParametersFetched: true,
                }))
            }
        },

        setIsItemParametersFetched: (fetched) => {
            set(() => ({ isItemParametersFetched: fetched }))
        },

        setItemParametersPanelMode: (mode) => {
            set(() => ({ itemParametersPanelMode: mode }))
        }
    }


}))

export const useItemDashboardActions = () => useItemDashboardSelection((state) => state.actions) 
