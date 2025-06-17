import { inventoryActions } from '@/actions/inventory';
import { BprBomItemInventory } from '@/actions/inventory/inventory/getAllByBom';
import { productionActions } from '@/actions/production';
import { BprBomItem } from '@/actions/production/bprs/boms/getByBpr';
import { BatchProductionRecord } from '@/actions/production/bprs/getOne';
import { BprStatus } from '@/actions/production/bprs/statuses/getAll';
import { create } from 'zustand';

type State = {
    bpr: BatchProductionRecord | null,
    bprStatuses: BprStatus[],
    bom: BprBomItem[],
    bomItemInventory: BprBomItemInventory[],
    selectedBomItem: BprBomItemInventory | null,
}

export type planningDashboardStates = keyof State

type Actions = {
    actions: {
        getBpr: (bprId: string) => void;
        getBprStatuses: () => void;
        getBom: () => void;
        getBomItemInventory: () => void;
        setSelectedBomItem: (item: BprBomItemInventory | null) => void;
    }
}

export const usePlanningDashboardSelection = create<State & Actions>((set, get) => ({

    bpr: null,
    bprStatuses: [],
    bom: [],
    bomItemInventory: [],
    selectedBomItem: null,

    actions: {
        getBpr: async (bprId) => {
            try {
                const bpr = await productionActions.bprs.getOne(bprId);
                set(() => ({ bpr, }))
            } catch (error) {
                console.error(error)
            }
        },

        getBprStatuses: async () => {
            try {
                const statuses = await productionActions.bprs.statuses.getAll();
                set(() => ({ bprStatuses: statuses }));
            } catch (error) {
                console.error(error)
            }
        },

        getBom: async () => {
            const bpr = get().bpr;
            if (!bpr) {
                throw new Error('Error fetching BOM wihtout BPR')
            }

            try {
                const bom = await productionActions.bprs.boms.getByBpr(bpr.id);
                set(() => ({ bom, }))

            } catch (error) {
                console.error(error);
            }
        },

        getBomItemInventory: async () => {
            const bom = get().bom;
            if (bom.length === 0) throw new Error("Cannot retrieve Inventory without BOM")

            try {
                const inventory = await inventoryActions.inventory.getAllByBprBom(bom);
                set(() => ({ bomItemInventory: inventory }))
            } catch (error) {
                console.error(error)
            }
        },

        setSelectedBomItem: (item) => {
            set(() => ({ selectedBomItem: item }))
        }
    }


}))

export const usePlanningDashboardActions = () => usePlanningDashboardSelection((state) => state.actions) 
