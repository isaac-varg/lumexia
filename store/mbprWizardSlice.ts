import { inventoryActions } from "@/actions/inventory";
import { Item } from "@/actions/inventory/getAllItems";
import { SingleItem } from "@/actions/inventory/getOneItem";
import { productionActions } from "@/actions/production";
import { BomMaterialByMbpr } from "@/actions/production/mbpr/bom/getAllByMbpr";
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
    materialFormSeletedBomItem: Item | null
    isMaterialFormEdited: boolean
    materialIdentifierSequence: number
    selectedMbprBomItems: BomMaterialByMbpr[];
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
        setSelectedMaterial: (material: MbprWizardMaterial | null) => void;
        setMaterialFormSelectedBomItem: (material: Item | null) => void;
        addSelectedMbprBomItem: (material: BomMaterialByMbpr) => void;
        setIsMaterialFormEdited: (edited: boolean) => void;
        incrementMaterialIdentifierSequence: () => void;
        getMbprs: (itemId: string) => void;
        getSteps: (mbprId: string) => void;
        getMaterialItems: () => void;
        updateSelectedMbprBomItem: (id: string, material: BomMaterialByMbpr) => void;
        revalidate: () => void;
    },

};


export const useMbprWizardSelection = create<State & Actions>((set, get) => ({
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
    materialFormSeletedBomItem: null,
    isMaterialFormEdited: false,
    materialIdentifierSequence: 0,
    selectedMbprBomItems: [],

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

        incrementMaterialIdentifierSequence: () => {
            set((state) => ({ materialIdentifierSequence: state.materialIdentifierSequence + 1 }))
        },
        addSelectedMbprBomItem: (material) => {
            set((state) => ({
                selectedMbprBomItems: [...state.selectedMbprBomItems, material]
            }))
        },

        updateSelectedMbprBomItem: (id, material) => {

            const state = get()
            const interimSeletedMbprBomItems = state.selectedMbprBomItems;

            const updated = interimSeletedMbprBomItems.map((bom) => {
                if (bom.id === id) {
                    return { ...bom, ...material };
                }

                return bom
            });

            set(() => ({
                selectedMbprBomItems: updated,
            }))

        },

        getMaterialItems: async () => {

            try {
                const items = await inventoryActions.items.getAll();
                set(() => ({ materialItems: items }))
            } catch (error) {
                console.error("There was an error fetching the items:", error)
            }
        },

        setIsMaterialFormEdited: (edited) => {
            set(() => ({ isMaterialFormEdited: false }))
        },

        setMaterialFormSelectedBomItem: (material) => {
            if (!material) {
                set(() => ({ materialFormSeletedBomItem: null }))
                return;
            }
            set(() => ({ materialFormSeletedBomItem: material }))
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

            set(() => ({ materialIdentifierSequence: mbpr.BillOfMaterial.length }))

        },

        setSelectedStep: async (step) => {

            // set selected step
            set(() => ({ selectedStep: step }))

            // get bom
            try {
                const bomMaterials = await productionActions.mbprs.bom.getAllByMbpr(step.mbprId);
                set(() => ({
                    selectedMbprBomItems: bomMaterials,
                }))
            } catch (error) {
                console.error(error)
            }
        }
    },
}))

export const useMbprWizardActions = () => useMbprWizardSelection((state) => state.actions) 
