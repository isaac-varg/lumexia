import { inventoryActions } from '@/actions/inventory';
import { Lot } from '@/actions/inventory/lots/getAll';
import { SingleLot } from '@/actions/inventory/lots/getOne';
import { qualityActions } from '@/actions/quality';
import { ExaminationType } from '@/actions/quality/qc/examinationTypes/getAll';
import { QcItemParameter } from '@/actions/quality/qc/parameters/getAllByItem';
import { create } from 'zustand';

type State = {
    isLoading: boolean
    wizardStep: number
    selectedLotId: string | null
    allLots: Lot[]
    lot: SingleLot,
    itemParameters: QcItemParameter[],
    examinationTypes: ExaminationType[],
}

type Actions = {
    actions: {
        nextStep: () => void;
        previousStep: () => void;
        setSelectedLotId: (id: string) => void;
        setLot: (lot: SingleLot) => void;
        setIsLoading: (loading: boolean) => void;
        getLots: () => void;
        getItemParameters: () => void;
        getExaminationTypes: () => void;

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
        }
    }


}))

export const useQcExaminationActions = () => useQcExaminationSelection((state) => state.actions) 
