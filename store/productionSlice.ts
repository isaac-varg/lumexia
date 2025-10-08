import { productionActions } from "@/actions/production"
import { BprNote } from "@/actions/production/bprs/notes/getAllByBpr"
import { BprNoteType } from "@/actions/production/bprs/notes/notesTypes/getAll"
import { ProductionStep } from "@/app/production/bpr/[bpr]/_actions/compounding/getSteps"
import { BprBomItem } from "@/app/production/bpr/[bpr]/_actions/getBprBom"
import { getBprStagings, BprStagingItem } from "@/app/production/bpr/[bpr]/_actions/getBprStagings"
import { ProductionBpr } from "@/app/production/bpr/[bpr]/_actions/getProductionBpr"
import { bprStagingStatuses } from "@/configs/staticRecords/bprStagingStatuses"
import { create } from "zustand"



type State = {
  bpr: ProductionBpr | null,
  bom: BprBomItem[],
  selectedBomItem: BprBomItem | null,
  stagings: BprStagingItem[],
  stagingDetailsMode: 'main' | 'note' | 'add'
  compoundingDetailsMode: 'main' | 'note'
  steps: ProductionStep[]
  selectedStep: ProductionStep | null
  isStagingsLoading: boolean,
  qualityDetailsViewMode: 'main' | 'note'
  bprNoteTypes: BprNoteType[]
  bprNotes: BprNote[]
  qualityMode: 'primary' | 'secondary'
  viewStatuses: {
    isStaging: boolean,
    isPrimaryVerifcation: boolean,
    isSecondaryVerification: boolean
    isCompounding: boolean
  }

}

type Actions = {
  actions: {
    setBpr: (bpr: ProductionBpr | null) => void;
    setBom: (bom: BprBomItem[]) => void;
    setSelectedBomItem: (item: BprBomItem | null) => void;
    fetchStagings: (bprBomId: string) => Promise<void>;
    setViewStatuses: () => void;
    setQualityDetailsViewMode: (mode: 'note' | 'main') => void;
    setQualityMode: (mode: 'primary' | 'secondary') => void;
    setSteps: (steps: ProductionStep[]) => void;
    setSelectedStep: (step: ProductionStep | null) => void;
    setStagingDetailsMode: (mode: 'main' | 'note' | 'add') => void;
    getBprNoteType: () => void;
    setBprNotes: (notes: BprNote[]) => void;
    setCompoundingDetailsMode: (mode: 'main' | 'note') => void;
  }
}

export const useProductionSelection = create<State & Actions>((set, get) => ({
  bpr: null,
  bom: [],
  bprNoteTypes: [],
  bprNotes: [],
  selectedBomItem: null,
  stagings: [],
  stagingDetailsMode: 'main' as any,
  steps: [],
  selectedStep: null,
  isStagingsLoading: false,
  qualityMode: 'primary' as any,
  qualityDetailsViewMode: 'main' as any,
  compoundingDetailsMode: 'main' as any,
  viewStatuses: {
    isStaging: false,
    isPrimaryVerifcation: false,
    isSecondaryVerification: false,
    isCompounding: false
  },

  actions: {
    setBpr: (bpr) => set(() => ({ bpr })),
    setQualityDetailsViewMode: (mode) => set(() => ({ qualityDetailsViewMode: mode })),
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

    getBprNoteType: async () => {
      const types = await productionActions.bprs.notes.types.getAll();
      set(() => ({ bprNoteTypes: types }));
    },


    setViewStatuses: () => {
      const { bpr, bom } = get()
      const { notStarted, staged, verified, secondaryVerification } = bprStagingStatuses;

      if (!bpr || bom.length === 0) return;

      const isUnstaged = bom.some(item => item.statusId === notStarted);
      const isSomePrimaryVerification = bom.some(item => item.statusId === staged);
      const isSomeSecondaryVerification = bom.some(item => item.statusId === verified);
      const isCompounding = !isUnstaged && !isSomePrimaryVerification && !isSomeSecondaryVerification

      set((state) => ({
        viewStatuses: {
          ...state.viewStatuses,
          isPrimaryVerifcation: isSomePrimaryVerification,
          isStaging: isUnstaged,
          isSecondaryVerification: isSomeSecondaryVerification,
          isCompounding,
        }
      }))
    },

    setQualityMode: (mode) => set(() => ({ qualityMode: mode })),
    setSteps: (steps) => set(() => ({ steps })),
    setSelectedStep: (step) => set(() => ({ selectedStep: step })),
    setStagingDetailsMode: (mode) => set(() => ({ stagingDetailsMode: mode })),
    setBprNotes: (notes) => set(() => ({ bprNotes: notes })),
    setCompoundingDetailsMode: (mode) => set(() => ({ compoundingDetailsMode: mode })),
  }
}))

export const useProductionActions = () => useProductionSelection((state) => state.actions)
