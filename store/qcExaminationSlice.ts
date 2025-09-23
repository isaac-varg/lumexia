import { Lot } from "@/actions/inventory/lots/getAll";
import { SingleLot } from "@/actions/inventory/lots/getOne";
import { qualityActions } from "@/actions/quality";
import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll";
import { QcItemParameter } from "@/actions/quality/qc/parameters/getAllByItem";
import { QcExamination } from "@/actions/quality/qc/records/getAll";
import { getUserId } from "@/actions/users/getUserId";
import { staticRecords } from "@/configs/staticRecords";
import { create } from "zustand"


type State = {
  examinationTypes: ExaminationType[]
  itemParameters: QcItemParameter[]
  lots: Lot[];
  selectedExaminationType: ExaminationType | null
  selectedItemParameter: QcItemParameter | null
  specimentLot: SingleLot | null;
  step: number;
  qcRecord: QcExamination | null;
}

type Actions = {
  actions: {
    createQcRecord: () => void;
    nextStep: () => void;
    setExaminationTypes: (types: ExaminationType[]) => void;
    setItemParameters: (itemParameters: QcItemParameter[]) => void;
    setSelectedExaminationType: (type: ExaminationType) => void;
    setSelectedItemParameter: (itemParameter: QcItemParameter) => void;
    setStep: (step: number) => void;
    setLots: (lots: Lot[]) => void;
    setSpecimentLot: (lot: SingleLot) => void;

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


  actions: {
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    setExaminationTypes: (types) => set(() => ({ examinationTypes: types })),
    setItemParameters: (itemParameters) => set(() => ({ itemParameters })),
    setSelectedExaminationType: (type) => set(() => ({ selectedExaminationType: type })),
    setSelectedItemParameter: (itemParameter) => set(() => ({ selectedItemParameter: itemParameter })),
    setStep: (step) => set(() => ({ step })),
    setSpecimentLot: (lot) => set(() => ({ specimentLot: lot })),
    setLots: (lots) => set(() => ({ lots })),

    createQcRecord: async () => {
      const { selectedExaminationType, specimentLot } = get()
      const userId = await getUserId()
      if (!selectedExaminationType || !specimentLot) return;

      const exam = await qualityActions.qc.records.create({
        conductedById: userId,
        statusId: staticRecords.quality.records.statuses.open,
        examinationTypeId: selectedExaminationType.id,
        examinedLotId: specimentLot.id,
      })

      set(() => ({ qcRecord: exam }));
    }
  },



}))

export const useQcExaminationActions = () => useQcExaminationSelection((state) => state.actions)
