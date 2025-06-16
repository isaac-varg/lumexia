import { inventoryActions } from '@/actions/inventory';
import { ItemAlias } from '@/actions/inventory/aliases/getByItem';
import { SingleItem } from '@/actions/inventory/getOneItem';
import inventoryTypeActions from '@/actions/inventory/inventoryTypeActions';
import { qualityActions } from '@/actions/quality';
import { QcItemParameter } from '@/actions/quality/qc/parameters/getAllByItem';
import { create } from 'zustand';

type State = {
    item: SingleItem | null
    itemParameters: QcItemParameter[]
    isItemParametersFetched: boolean;
    itemParametersPanelMode: "view" | "add";
    selectedItemParameter: QcItemParameter | null;
    aliases: ItemAlias[]
    selectedAlias: ItemAlias | null
    aliasDialogMode: "modify" | 'create' | null

}

export type itemDashboardStates = keyof State

type Actions = {
    actions: {
        getItem: (id: string) => void;
        getQcItemParameters: () => void;
        getAliases: () => void;
        setItemParametersPanelMode: (mode: "view" | "add") => void;
        setIsItemParametersFetched: (fetched: boolean) => void;
        setSelectedAlias: (alias: ItemAlias | null) => void;
        setAliasDialogMode: (mode: "modify" | 'create' | null) => void;
        setSelectedQcItemParameter: (parameter: QcItemParameter | null) => void;
    }
}

export const useItemDashboardSelection = create<State & Actions>((set, get) => ({
    item: null,
    itemParameters: [],
    isItemParametersFetched: false,
    itemParametersPanelMode: 'view',
    selectedItemParameter: null,
    aliases: [],
    selectedAlias: null,
    aliasDialogMode: null,

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

        getAliases: async () => {
            const item = get().item
            if (!item) return;
            try {
                const aliases = await inventoryActions.aliases.getByItem(item.id);
                set(() => ({ aliases, }));
            } catch (error) {
                console.error(error)
            }
        },

        setIsItemParametersFetched: (fetched) => {
            set(() => ({ isItemParametersFetched: fetched }))
        },

        setItemParametersPanelMode: (mode) => {
            set(() => ({ itemParametersPanelMode: mode }))
        },

        setSelectedAlias: (alias) => {
            set(() => ({ selectedAlias: alias }));
        },

        setAliasDialogMode: (mode) => {
            set(() => ({ aliasDialogMode: mode }))
        },

        setSelectedQcItemParameter: (parameter) => {
            set(() => ({ selectedItemParameter: parameter, }))
        }
    }


}))

export const useItemDashboardActions = () => useItemDashboardSelection((state) => state.actions) 
