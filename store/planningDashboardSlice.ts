import { accountingActions } from '@/actions/accounting';
import { LastItemPrice } from '@/actions/accounting/pricing/getLastItemPrice';
import { inventoryActions } from '@/actions/inventory';
import { BprBomItemInventory } from '@/actions/inventory/inventory/getAllByBom';
import { productionActions } from '@/actions/production';
import { BprBomItem } from '@/actions/production/bprs/boms/getByBpr';
import { BatchProductionRecord } from '@/actions/production/bprs/getOne';
import { BprNote } from '@/actions/production/bprs/notes/getAllByBpr';
import { BprStatus } from '@/actions/production/bprs/statuses/getAll';
import { purchasingActions } from '@/actions/purchasing';
import { PurchasingRequestForPlanning } from '@/actions/purchasing/requests/getByItem';
import { qualityActions } from '@/actions/quality';
import { QcGroupFromItem } from '@/actions/quality/qc/groups/groupParameters/getAllByItem';
import { QcExamination } from '@/actions/quality/qc/records/getAll';
import { BprNoteType } from '@prisma/client';
import { create } from 'zustand';

type State = {
  bpr: BatchProductionRecord | null,
  bprStatuses: BprStatus[],
  bom: BprBomItem[],
  bomItemInventory: BprBomItemInventory[],
  selectedBomItem: BprBomItemInventory | null,
  purchasingRequests: PurchasingRequestForPlanning[]
  isLoading: boolean
  qcExaminations: QcExamination[],
  qcGroups: QcGroupFromItem[],
  lastItemPrice: LastItemPrice | null,
  bprNotes: BprNote[],
  bprNoteTypes: BprNoteType[]

}

export type planningDashboardStates = keyof State

type Actions = {
  actions: {
    getBpr: (bprId: string) => void;
    getBprStatuses: () => void;
    getBom: () => void;
    getBomItemInventory: () => void;
    getPurchasingRequestsForPlanning: () => void;
    getQcExaminations: () => void;
    getQcGroups: () => void;
    getLastItemPrice: () => void;
    getBprNotes: () => void;
    getBprNoteTypes: () => void;
    setSelectedBomItem: (item: BprBomItemInventory | null) => void;
  }
}

export const usePlanningDashboardSelection = create<State & Actions>((set, get) => ({

  bpr: null,
  bprStatuses: [],
  bom: [],
  bomItemInventory: [],
  selectedBomItem: null,
  purchasingRequests: [],
  isLoading: false,
  qcExaminations: [],
  qcGroups: [],
  lastItemPrice: null,
  bprNotes: [],
  bprNoteTypes: [],


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

    getPurchasingRequestsForPlanning: async () => {
      const selectedBomItem = get().selectedBomItem;
      if (!selectedBomItem) return;

      try {
        set(() => ({ isLoading: true }))
        const requests = await purchasingActions.requests.getPurchasingRequestsForPlanning(selectedBomItem.bom.itemId);
        set(() => ({ purchasingRequests: requests, }))
      } catch (error) {
        console.error(error)
      } finally {
        set(() => ({ isLoading: false }))
      }
    },

    getQcExaminations: async () => {
      const bpr = get().bpr;

      if (!bpr) throw new Error('Cannot get examinations without BPR');

      try {
        set(() => ({ isLoading: true }))
        const exams = await qualityActions.qc.records.getAllByBpr(bpr.id)
        set(() => ({ qcExaminations: exams }))
      } catch (error) {
        console.error(error)
      } finally {
        set(() => ({ isLoading: false }))
      }
    },

    getQcGroups: async () => {
      const { bpr } = get();

      if (!bpr) return;

      try {
        set(() => ({ isLoading: true }))

        const groups = await qualityActions.qc.groups.groupParameters.getAllByItem(bpr.mbpr.producesItemId);
        set(() => ({ qcGroups: groups }));
      } catch (error) {
        console.error(error)
      } finally {
        set(() => ({ isLoading: false }))
      }
    },

    getLastItemPrice: async () => {
      const { bpr } = get()

      if (!bpr) return;

      try {
        set(() => ({ isLoading: true }))
        const price = await accountingActions.pricing.item.getLastItemPrice(bpr.mbpr.producesItemId);
        set(() => ({ lastItemPrice: price }))
      } catch (error) {
        console.error(error)
      } finally {
        set(() => ({ isLoading: false }))
      }
    },

    getBprNotes: async () => {
      const { bpr } = get();

      if (!bpr) return;

      try {
        set(() => ({ isLoading: true }))
        const notes = await productionActions.bprs.notes.getAllByBpr(bpr.id);
        set(() => ({ bprNotes: notes }))

      } catch (error) {
        console.error(error)
      } finally {
        set(() => ({ isLoading: false }))
      }
    },

    getBprNoteTypes: async () => {

      try {
        set(() => ({ isLoading: true }))
        const types = await productionActions.bprs.notes.types.getAll()
        set(() => ({ bprNoteTypes: types }))

      } catch (error) {
        console.error(error)
      } finally {
        set(() => ({ isLoading: false }))
      }
    },



    setSelectedBomItem: (item) => {
      set(() => ({ selectedBomItem: item }))
    }
  }


}))

export const usePlanningDashboardActions = () => usePlanningDashboardSelection((state) => state.actions) 
