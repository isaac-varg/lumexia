import { inventoryActions } from "@/actions/inventory";
import { Item } from "@/actions/inventory/getAllItems";
import { SingleItem } from "@/actions/inventory/getOneItem";
import { productionActions } from "@/actions/production";
import { MbprFromItem } from "@/actions/production/mbpr/getAllByProducedItem";
import { Step } from "@/actions/production/mbpr/steps/getAllByMbpr";
import { create } from "zustand";

export type FormPanelMode = 'default' | 'material' | 'addendum' | 'equipment' | 'actionables' | 'instructions'
export type MbprWizardMaterial = Step['BillOfMaterial'][number]


type State = {
    step: number
    producesItemId: string
    producesItem: SingleItem | null
    mbprs: MbprFromItem[]
    selectedMbpr: MbprFromItem | null
    isLoading: boolean
    isRevalidating: boolean
    isNewlyCreated: boolean
    steps: Step[]
    selectedStep: Step | null
    formPanelMode: FormPanelMode
    isNewForFormPanel: boolean
    selectedMaterial: MbprWizardMaterial | null
    materialItems: Item[]
}


export type mbprWizardStates = keyof State

type Actions = {
    actions: {
        nextStep: () => void
        setProducesItem: (itemId: string) => void;
        setSelectedMbpr: (mbpr: MbprFromItem) => void;
        setSelectedStep: (step: Step) => void;
        setFormPanelMode: (mode: FormPanelMode) => void;
        setIsNewForFormPanel: (isNew: boolean) => void;
        setSelectedMaterial: (material: MbprWizardMaterial) => void;
        getMbprs: (itemId: string) => void;
        getSteps: (mbprId: string) => void;
        getMaterialItems: () => void;
        revalidate: () => void;
    },

};


export const useMbprWizardSelection = create<State & Actions>((set) => ({
    step: 0,
    producesItemId: '',
    producesItem: null,
    mbprs: [],
    selectedMbpr: null,
    isLoading: false,
    isRevalidating: false,
    steps: [],
    selectedStep: null,
    isNewlyCreated: false,
    formPanelMode: 'default',
    isNewForFormPanel: true,
    selectedMaterial: null,
    materialItems: [],

    actions: {
        nextStep: () => {
            set((state) => ({
                step: state.step + 1
            }))
        },

        revalidate: () => {
            set((state) => ({ isRevalidating: !state.isRevalidating }))
        },

        getMbprs: async (itemId) => {

            try {
                set(() => ({ isLoading: true }))
                const mbprs = await productionActions.mbprs.getAllByProducedItem(itemId);

                set(() => ({ mbprs, }))
            } catch (error) {
                console.error('There was an issue fetching matching MBPRs', error)
            } finally {
                set(() => ({ isLoading: false }))
            }
        },

        getSteps: async (mbprId) => {

            try {
                set(() => ({ isLoading: true }));
                const steps = await productionActions.mbprs.steps.getAllByMbpr(mbprId);

                if (steps.length === 0) {
                    set(() => ({ isNewlyCreated: true }))
                }


                set(() => ({ steps, isNewlyCreated: false }))
            } catch (error) {
                console.error('There was an error fetching the MBPR Steps', error)
            } finally {
                set(() => ({
                    isLoading: false
                }))
            }
        },

        getMaterialItems: async () => {

            try {
                const items = await inventoryActions.items.getAll();
                set(() => ({ materialItems: items }))
            } catch (error) {
                console.error("There was an error fetching the items:", error)
            }
        },

        setSelectedMaterial: (material) => {
            set(() => ({ selectedMaterial: material }))
        },

        setIsNewForFormPanel: (isNew) => {
            set(() => ({ isNewForFormPanel: isNew }))
        },

        setFormPanelMode: (mode) => {
            set(() => ({ formPanelMode: mode }))
        },

        setProducesItem: async (itemId) => {

            set(() => ({ producesItemId: itemId }))

            if (itemId.length === 0) return

            try {
                const item = await inventoryActions.items.getOne(itemId);

                set(() => ({ producesItem: item }));

            } catch (error) {
                console.error('There was an error fetching the selected Item', error)
            } finally {
                set(() => ({
                    step: 1
                }))
            }
        },

        setSelectedMbpr: (mbpr) => {
            set(() => ({ selectedMbpr: mbpr }))
        },

        setSelectedStep: (step) => {
            set(() => ({ selectedStep: step }))
        }
    },
}))

export const useMbprWizardActions = () => useMbprWizardSelection((state) => state.actions) 
