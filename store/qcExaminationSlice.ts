import { inventoryActions } from '@/actions/inventory';
import { Lot } from '@/actions/inventory/lots/getAll';
import { SingleLot } from '@/actions/inventory/lots/getOne';
import { create } from 'zustand';

type State = {
    isLoading: boolean
    wizardStep: number
    selectedLotId: string | null
    allLots: Lot[]
    lot: SingleLot,
}

type Actions = {
    actions: {
        nextStep: () => void;
        previousStep: () => void;
        setSelectedLotId: (id: string) => void;
        setLot: (lot: SingleLot) => void;
        setIsLoading: (loading: boolean) => void;
        getLots: () => void;

    }
}

export const useQcExaminationSelection = create<State & Actions>((set, get) => ({
    wizardStep: 0,
    isLoading: false,
    allLots: [],
    selectedLotId: null,
    lot: null,

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

        }
    }


}))

export const useQcExaminationActions = () => useQcExaminationSelection((state) => state.actions) 
