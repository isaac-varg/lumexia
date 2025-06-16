import { inventoryActions } from '@/actions/inventory';
import { Lot } from '@/actions/inventory/lots/getAll';
import { SingleLot } from '@/actions/inventory/lots/getOne';
import { qualityActions } from '@/actions/quality';
import { ExaminationType } from '@/actions/quality/qc/examinationTypes/getAll';
import { QcItemParameter } from '@/actions/quality/qc/parameters/getAllByItem';
import { create } from 'zustand';
import { QcRecordNoteType } from '@/actions/quality/qc/recordNotes/types/getAll';
import { QcRecordNote } from '@/actions/quality/qc/recordNotes/getAllByRecord';
import { getUserId } from '@/actions/users/getUserId';
import { staticRecords } from '@/configs/staticRecords';
import { QcRecordStatus } from '@/actions/quality/qc/records/statuses/getAll';


export type IntermediateParameterResult = {
    parameterId: string;
    note?: string;
    [key: string]: string | number | boolean | undefined;
}

type State = {
    isLoading: boolean
    wizardStep: number
    selectedLotId: string | null
    allLots: Lot[]
    lot: SingleLot,
    itemParameters: QcItemParameter[],
    examinationTypes: ExaminationType[],
    selectedExaminationType: ExaminationType | null,
    selectedItemParameter: QcItemParameter | null,
    examinationRecordId: string | null,
    parameterResults: Record<string, IntermediateParameterResult>;
    recordNoteTypes: QcRecordNoteType[];
    recordNotes: QcRecordNote[];
    isValidated: boolean;
    examinationStatuses: QcRecordStatus[]
    selectedExaminationStatusId: string;
}

type Actions = {
    actions: {
        nextStep: () => void;
        setStep: (step: number) => void;
        previousStep: () => void;
        setSelectedLotId: (id: string) => void;
        setLot: (lot: SingleLot) => void;
        setIsLoading: (loading: boolean) => void;
        setSelectedExaminationType: (type: ExaminationType) => void;
        setSelectedItemParameter: (itemParameter: QcItemParameter) => void;
        setExaminationRecordId: () => void;
        getLots: () => void;
        getItemParameters: () => void;
        getExaminationTypes: () => void;
        setParameterResult: (parameterId: string, results: IntermediateParameterResult) => void;
        getParameterResult: (parameterId: string) => IntermediateParameterResult | undefined;
        hasParameterResult: (parameterId: string) => boolean;
        getRecordNoteTypes: () => void;
        getRecordNotes: () => void;
        conductValidation: () => void;
        getExaminationStatuses: () => void;
        setSelectedExaminationStatusId: (id: string) => void;
    }
}

export const useQcExaminationSelection = create<State & Actions>((set, get) => ({
    wizardStep: 0,
    isLoading: false,
    allLots: [],
    selectedLotId: null,
    lot: null,
    itemParameters: [],
    examinationTypes: [],
    selectedExaminationType: null,
    selectedItemParameter: null,
    examinationRecordId: null,
    parameterResults: {},
    recordNoteTypes: [],
    recordNotes: [],
    isValidated: false,
    examinationStatuses: [],
    selectedExaminationStatusId: '',

    actions: {
        nextStep: () => {
            set((state) => ({ wizardStep: state.wizardStep + 1 }))

        },
        previousStep: () => {
            set((state) => ({ wizardStep: state.wizardStep - 1 }))

        },
        setIsLoading: (loading) => {
            set(() => ({ isLoading: loading }))
        },
        setSelectedLotId: (id) => {
            set(() => ({ selectedLotId: id }));
        },
        setLot: (lot) => {
            set(() => ({ lot, }))
        },
        setSelectedExaminationType: (type) => {
            set(() => ({ selectedExaminationType: type, }))
        },
        setSelectedItemParameter: (itemParameter) => {
            set(() => ({ selectedItemParameter: itemParameter, }))
        },
        setExaminationRecordId: async () => {
            const userId = await getUserId()
            const lot = get().lot;

            if (!userId || !lot) return;
            const bpr = lot.lotOrigin[0].bprId
            const po = lot.lotOrigin[0].purchaseOrderId


            const record = await qualityActions.qc.records.create({
                conductedById: userId,
                statusId: staticRecords.quality.records.statuses.open,
                examinationTypeId: staticRecords.quality.examinations.types.inProcess,
                examinedLotId: lot.id,
                ...(lot.lotOrigin[0].originType === 'batchProduction' ? { linkedBprId: bpr } : { linkedPurchaseOrderItemId: po }),
            })

            set(() => ({ examinationRecordId: record.id, selectedExaminationStatusId: staticRecords.quality.records.statuses.open }))
        },
        setParameterResult: (parameterId, results) => {
            set((state) => ({
                parameterResults: {
                    ...state.parameterResults,
                    [parameterId]: results
                }
            }))
        },

        getLots: async () => {
            try {
                set(() => ({ isLoading: true }));
                const lots = await inventoryActions.lots.getAll();
                set(() => ({ allLots: lots }))
            } catch (error) {
                console.error(error)
                throw new Error("Lots were not able to be retrieved.")
            } finally {
                set(() => ({ isLoading: false }))
            };

        },

        getItemParameters: async () => {
            const { lot } = get()

            if (!lot || !lot.itemId) {
                throw new Error('Could not find item parameters.');
            }

            try {
                set(() => ({ isLoading: true, }));
                const parameters = await qualityActions.qc.itemParameters.getByItem(lot.itemId);
                set(() => ({ itemParameters: parameters }))
            } catch (error) {
                console.error(error)
                throw new Error("Unable to retrieve item parameters");
            } finally {

                set(() => ({ isLoading: false, }));
            }
        },

        getExaminationTypes: async () => {
            try {
                const types = await qualityActions.qc.examinationTypes.getAll();
                set(() => ({ examinationTypes: types, }))
            } catch (error) {
                console.error(error);
            }
        },

        getParameterResult: (parameterId) => {
            return get().parameterResults[parameterId]
        },

        getRecordNoteTypes: async () => {
            try {
                const types = await qualityActions.qc.recordNotes.types.getAll();
                set(() => ({ recordNoteTypes: types, }))
            } catch (error) {
                console.error(error)
            }
        },
        getRecordNotes: async () => {
            const recordId = get().examinationRecordId;

            if (!recordId) {
                throw new Error("Could retrieve notes due to missing record ID");
            }

            try {
                const notes = await qualityActions.qc.recordNotes.getAllByRecord(recordId);
                set(() => ({ recordNotes: notes }))
            } catch (error) {
                console.error(error)
                throw new Error("Something went wrong fetching the record notes.")
            }
        },

        getExaminationStatuses: async () => {
            try {
                const statuses = await qualityActions.qc.records.statsues.getAll();
                set(() => ({ examinationStatuses: statuses }))
            } catch (error) {
                console.error(error)
            }
        },

        setSelectedExaminationStatusId: (id) => {
            set(() => ({ selectedExaminationStatusId: id, }))
        },

        hasParameterResult: (parameterId) => {
            return !!get().parameterResults[parameterId]
        },


        conductValidation: () => {
            const itemParameters = get().itemParameters;
            const hasResult = get().actions.hasParameterResult;
            const allHaveResults = itemParameters.every(p => hasResult(p.parameterId))
            const selectedExaminationType = get().selectedExaminationType;
            const isRecordStatusSelected = get().selectedExaminationStatusId !== staticRecords.quality.records.statuses.open;

            if (allHaveResults && selectedExaminationType && isRecordStatusSelected) {
                set(() => ({ isValidated: true }))
            } else {
                set(() => ({ isValidated: false }))
            }
        },

        setStep: (step) => {
            set(() => ({ wizardStep: 1 }));
        }

    },
}))

export const useQcExaminationActions = () => useQcExaminationSelection((state) => state.actions) 
