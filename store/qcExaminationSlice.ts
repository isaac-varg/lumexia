import { Lot } from "@/actions/inventory/lots/getAll";
import { SingleLot } from "@/actions/inventory/lots/getOne";
import { qualityActions } from "@/actions/quality";
import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll";
import { QcItemParameter } from "@/actions/quality/qc/parameters/getAllByItem";
import { QcExamination } from "@/actions/quality/qc/records/getAll";
import { getUserId } from "@/actions/users/getUserId";
import { ExaminationResults } from "@/app/quality/qc/examination/new/[lotNumber]/_actions/getResults";
import { staticRecords } from "@/configs/staticRecords";
import { create } from "zustand"


type State = {
  examinationTypes: ExaminationType[]
  itemParameters: QcItemParameter[]
  lots: Lot[];
  selectedExaminationType: ExaminationType | null
  results: Map<string, ExaminationResults>
  selectedItemParameter: QcItemParameter | null
  specimentLot: SingleLot | null;
  step: number;
  qcRecord: QcExamination | null;
}

type Actions = {
  actions: {
    nextStep: () => void;
    setExaminationTypes: (types: ExaminationType[]) => void;
    setItemParameters: (itemParameters: QcItemParameter[]) => void;
    setSelectedExaminationType: (type: ExaminationType) => void;
    setSelectedItemParameter: (itemParameter: QcItemParameter) => void;
    setStep: (step: number) => void;
    setLots: (lots: Lot[]) => void;
    setSpecimentLot: (lot: SingleLot) => void;
    setRecord: (record: QcExamination) => void;
    setResults: (results: ExaminationResults[]) => void;
  }
}

export const useQcExaminationSelection = create<State & Actions>((set, get) => ({
  qcRecord: null,
  examinationTypes: [],
  itemParameters: [],
  lots: [],
  selectedExaminationType: null,
  selectedItemParameter: null,
  specimentLot: null,
  step: 0,
  results: new Map,


  actions: {
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    setExaminationTypes: (types) => set(() => ({ examinationTypes: types })),
    setItemParameters: (itemParameters) => set(() => ({ itemParameters })),
    setSelectedExaminationType: (type) => set(() => ({ selectedExaminationType: type })),
    setSelectedItemParameter: (itemParameter) => set(() => ({ selectedItemParameter: itemParameter })),
    setStep: (step) => set(() => ({ step })),
    setSpecimentLot: (lot) => set(() => ({ specimentLot: lot })),
    setLots: (lots) => set(() => ({ lots })),
    setRecord: (record) => set(() => ({ qcRecord: record })),
    setResults: (results) => {
      const mapping = new Map(results.map(result => [result.qcItemParameterId, result]))
      set(() => ({ results: mapping }))
    }
  },



}))

export const useQcExaminationActions = () => useQcExaminationSelection((state) => state.actions)
