import { Lot } from "@/actions/inventory/lots/getAll";
import { SingleLot } from "@/actions/inventory/lots/getOne";
import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll";
import { QcItemParameter } from "@/actions/quality/qc/parameters/getAllByItem";
import { create } from "zustand"


type State = {
  examinationTypes: ExaminationType[]
  itemParameters: QcItemParameter[]
  lots: Lot[];
  selectedExaminationType: ExaminationType | null
  specimentLot: SingleLot | null;
  step: number;
}

type Actions = {
  actions: {
    nextStep: () => void;
    setExaminationTypes: (types: ExaminationType[]) => void;
    setItemParameters: (itemParameters: QcItemParameter[]) => void;
    setSelectedExaminationType: (type: ExaminationType) => void;
    setStep: (step: number) => void;
    setLots: (lots: Lot[]) => void;
    setSpecimentLot: (lot: SingleLot) => void;
  }
}

export const useQcExaminationSelection = create<State & Actions>((set, get) => ({
  examinationTypes: [],
  itemParameters: [],
  lots: [],
  selectedExaminationType: null,
  specimentLot: null,
  step: 0,


  actions: {
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    setExaminationTypes: (types) => set(() => ({ examinationTypes: types })),
    setItemParameters: (itemParameters) => set(() => ({ itemParameters })),
    setSelectedExaminationType: (type) => set(() => ({ selectedExaminationType: type })),
    setStep: (step) => set(() => ({ step })),
    setSpecimentLot: (lot) => set(() => ({ specimentLot: lot })),
    setLots: (lots) => set(() => ({ lots })),
  },



}))

export const useQcExaminationActions = () => useQcExaminationSelection((state) => state.actions)
