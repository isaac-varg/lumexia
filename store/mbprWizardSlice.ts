import { inventoryActions } from "@/actions/inventory";
import { Item } from "@/actions/inventory/getAllItems";
import { SingleItem } from "@/actions/inventory/getOneItem";
import { productionActions } from "@/actions/production";
import { Addendum } from "@/actions/production/mbpr/addendums/getAllByMbpr";
import { BomMaterialByMbpr } from "@/actions/production/mbpr/bom/getAllByMbpr";
import { MbprFromItem } from "@/actions/production/mbpr/getAllByProducedItem";
import { Instructions } from "@/actions/production/mbpr/instructions/getAllByMbpr";
import { Step } from "@/actions/production/mbpr/steps/getAllByMbpr";
import { StepAddendumType } from "@prisma/client";
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
    selectedMbprInstructions: Instructions[];
    selectedMbprAddendums: Addendum[];
    selectedInstruction: Instructions | null;
    selectedAddendum: Addendum | null;
    addendumTypes: StepAddendumType[];
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
        setSelectedInstruction: (instruction: Instructions | null) => void;
        setSelectedAddendum: (addendum: Addendum | null) => void;
        setMaterialFormSelectedBomItem: (material: Item | null) => void;
        addSelectedMbprBomItem: (material: BomMaterialByMbpr) => void;
        addInstruction: (instruction: Instructions) => void;
        addAddendum: (addendum: Addendum) => void;
        updateInstruction: (id: string, content: string) => void;
        updateAddendum: (id: string, addendum: Addendum) => void;
        removeInstruction: (instructionId: string) => void;
        removeAddendum: (id: string) => void;
        setIsMaterialFormEdited: (edited: boolean) => void;
        incrementMaterialIdentifierSequence: () => void;
        getMbprs: (itemId: string) => void;
        getSteps: (mbprId: string) => void;
        getMaterialItems: () => void;
        updateSelectedMbprBomItem: (id: string, material: BomMaterialByMbpr) => void;
        revalidate: () => void;
        setAddendumTypes: (addendums: StepAddendumType[]) => void;
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
    selectedMbprInstructions: [],
    selectedInstruction: null,
    selectedMbprAddendums: [],
    selectedAddendum: null,
    addendumTypes: [],

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

        addInstruction: (instruction) => {
            set((state) => ({
                selectedMbprInstructions: [...state.selectedMbprInstructions, instruction]
            }))
        },

        addAddendum: (addendum) => {
            set((state) => ({
                selectedMbprAddendums: [...state.selectedMbprAddendums, addendum]
            }))
        },

        removeInstruction: (instructionId) => {
            set((state) => ({
                selectedMbprInstructions: state.selectedMbprInstructions.filter((i) => i.id !== instructionId)
            }))
        },

        removeAddendum: (id) => {
            set((state) => ({
                selectedMbprAddendums: state.selectedMbprAddendums.filter((a) => a.id !== id)
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


        updateInstruction: (id, content) => {
            set((state) => ({
                selectedMbprInstructions: state.selectedMbprInstructions.map((i) =>
                    i.id === id ? { ...i, instructionContent: content } : i
                ),
            }));
        },

        updateAddendum: (id, addendum) => {
            set((state) => ({
                selectedMbprAddendums: state.selectedMbprAddendums.map((a) =>
                    a.id === id ? { ...addendum } : a
                ),
            }));
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

            // get work instructions 
            try {
                const instructions = await productionActions.mbprs.instructions.getAllByMbpr(step.mbprId);
                set(() => ({
                    selectedMbprInstructions: instructions,
                }))
            } catch (error) {
                console.error(error)
            }


            // get equipment
            // get addendums


            try {
                const addendums = await productionActions.mbprs.addendums.getAllByMbpr(step.mbprId);
                set(() => ({
                    selectedMbprAddendums: addendums,
                }))
            } catch (error) {
                console.error(error)
            }

            // get actionables
        },

        setSelectedInstruction: (instruction) => {
            set(() => ({ selectedInstruction: instruction }))
        },

        setSelectedAddendum: (addendum) => {
            set(() => ({ selectedAddendum: addendum }))
        },

        setAddendumTypes: (addendums) => {
            set(() => ({ addendumTypes: addendums }))
        }
    },

}))

export const useMbprWizardActions = () => useMbprWizardSelection((state) => state.actions) 
