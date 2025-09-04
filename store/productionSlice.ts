import { BprBomItem } from "@/app/production/bpr/[bpr]/_actions/getBprBom"
import { getBprStagings, BprStagingItem } from "@/app/production/bpr/[bpr]/_actions/getBprStagings"
import { ProductionBpr } from "@/app/production/bpr/[bpr]/_actions/getProductionBpr"
import { staticRecords } from "@/configs/staticRecords"
import { create } from "zustand"


type State = {
  bpr: ProductionBpr | null,
  bom: BprBomItem[],
  selectedBomItem: BprBomItem | null,
  stagings: BprStagingItem[],
  stagingsMode: 'view' | 'add'
  isStagingsLoading: boolean,
  viewStatuses: {
    isStaging: boolean,
    isPrimaryVerifcation: boolean,
    isSecondaryVerification: boolean
  }

}

type Actions = {
  actions: {
    setBpr: (bpr: ProductionBpr | null) => void;
    setBom: (bom: BprBomItem[]) => void;
    setSelectedBomItem: (item: BprBomItem | null) => void;
    setStagingsMode: (mode: 'view' | 'add') => void;
    fetchStagings: (bprBomId: string) => Promise<void>;
    setViewStatuses: () => void;
  }
}

export const useProductionSelection = create<State & Actions>((set, get) => ({
  bpr: null,
  bom: [],
  selectedBomItem: null,
  stagings: [],
  stagingsMode: 'view',
  isStagingsLoading: false,
  viewStatuses: {
    isStaging: false,
    isPrimaryVerifcation: false,
    isSecondaryVerification: false,
  },

  actions: {
    setBpr: (bpr) => set(() => ({ bpr })),
    setBom: (bom) => set(() => ({ bom })),
    setSelectedBomItem: (item) => {
      set(() => ({ selectedBomItem: item, stagings: [], stagingsLoading: false, stagingsMode: 'view' }));
      if (item) {
        get().actions.fetchStagings(item.id);
      }
    },
    fetchStagings: async (bprBomId) => {
      set(() => ({ isStagingsLoading: true }));
      try {
        const stagings = await getBprStagings(bprBomId);
        set(() => ({ stagings, isStagingsLoading: false }));
      } catch (error) {
        console.error("Failed to fetch stagings:", error);
        set(() => ({ isStagingsLoading: false }));
      }
    },

    setStagingsMode: (mode) => set(() => ({ stagingsMode: mode })),

    setViewStatuses: () => {
      const { bpr, bom } = get()
      const { notStarted, staged, verified, secondaryVerification } = staticRecords.production.bprStagingStatuses;

      if (!bpr || bom.length === 0) return;

      const isUnstaged = bom.some(item => item.statusId === notStarted);

      if (isUnstaged) {
        set((state) => ({
          viewStatuses: {
            ...state.viewStatuses,
            isStaging: true,
          }
        }))
      }


    }
  }
}))

export const useProductionActions = () => useProductionSelection((state) => state.actions)
