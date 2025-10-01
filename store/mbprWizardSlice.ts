import { inventoryActions } from "@/actions/inventory";
import { Item } from "@/actions/inventory/getAllItems";
import { SingleItem } from "@/actions/inventory/getOneItem";
import { productionActions } from "@/actions/production";
import { CompoundingVessel } from "@/actions/production/compoundingVessels/getAllCompoundinVessels";
import { Actionable } from "@/actions/production/mbpr/actionables/getAllByMbpr";
import { Addendum } from "@/actions/production/mbpr/addendums/getAllByMbpr";
import { BatchSize } from "@/actions/production/mbpr/batchSizes/getAllByMbpr";
import { BomMaterialByMbpr } from "@/actions/production/mbpr/bom/getAllByMbpr";
import { MbprFromItem } from "@/actions/production/mbpr/getAllByProducedItem";
import { Instructions } from "@/actions/production/mbpr/instructions/getAllByMbpr";
import { Step } from "@/actions/production/mbpr/steps/getAllByMbpr";
import { itemTypes } from "@/configs/staticRecords/itemTypes";
import { StepActionableType, StepAddendumType } from "@prisma/client";
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
  selectedMbprActionables: Actionable[];
  selectedInstruction: Instructions | null;
  selectedAddendum: Addendum | null;
  selectedActionable: Actionable | null;
  addendumTypes: StepAddendumType[];
  actionableTypes: StepActionableType[];
  compoundingVessels: CompoundingVessel[];
  batchSizes: BatchSize[];
  selectedBatchSize: BatchSize | null;
  stepSequence: number;
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
    setSelectedActionable: (actionable: Actionable | null) => void;
    setMaterialFormSelectedBomItem: (material: Item | null) => void;
    addSelectedMbprBomItem: (material: BomMaterialByMbpr) => void;
    addInstruction: (instruction: Instructions) => void;
    addAddendum: (addendum: Addendum) => void;
    addActionable: (actionable: Actionable) => void;
    addStep: (step: Step) => void;
    updateInstruction: (id: string, content: string) => void;
    updateAddendum: (id: string, addendum: Addendum) => void;
    updateActionable: (id: string, actionable: Actionable) => void;
    removeInstruction: (instructionId: string) => void;
    removeAddendum: (id: string) => void;
    setIsMaterialFormEdited: (edited: boolean) => void;
    incrementMaterialIdentifierSequence: () => void;
    incrementStepSequence: () => void;
    getMbprs: (itemId: string) => void;
    getSteps: (mbprId: string) => void;
    getMaterialItems: () => void;
    updateSelectedMbprBomItem: (id: string, material: BomMaterialByMbpr) => void;
    revalidate: () => void;
    setAddendumTypes: (addendums: StepAddendumType[]) => void;
    setActionableTypes: (types: StepActionableType[]) => void;
    setCompoundingVessels: (vessels: CompoundingVessel[]) => void;
    setSelectedBatchSize: (batchSize: BatchSize | null) => void;
    setBatchSizes: (batchSizes: BatchSize[]) => void;
    getBatchSizes: (mbprId: string) => void;
    addBatchSize: (batchSize: BatchSize) => void;
    updateBatchSize: (id: string, batchSize: BatchSize) => void;
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
  formPanelMode: 'default' as any,
  isNewForFormPanel: true,
  selectedMaterial: null,
  materialItems: [],
  materialFormSeletedBomItem: null,
  isMaterialFormEdited: false,
  materialIdentifierSequence: 0,
  selectedMbprBomItems: [],
  selectedMbprInstructions: [],
  selectedMbprActionables: [],
  selectedInstruction: null,
  selectedMbprAddendums: [],
  selectedAddendum: null,
  addendumTypes: [],
  actionableTypes: [],
  selectedActionable: null,
  compoundingVessels: [],
  batchSizes: [],
  selectedBatchSize: null,
  stepSequence: 0,

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
          set(() => ({ isNewlyCreated: true, stepSequence: 1 }))
        }


        set(() => ({ steps, isNewlyCreated: false, stepSequence: steps.length + 1 }))
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

    incrementStepSequence: () => {
      set((state) => ({ stepSequence: state.stepSequence + 1 }))
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

    addActionable: (actionable) => {
      set((state) => ({
        selectedMbprActionables: [...state.selectedMbprActionables, actionable]
      }))
    },

    addAddendum: (addendum) => {
      set((state) => ({
        selectedMbprAddendums: [...state.selectedMbprAddendums, addendum]
      }))
    },

    addBatchSize: (batchSize) => {
      set((state) => ({
        batchSizes: [...state.batchSizes, batchSize]
      }));
    },

    addStep: (step) => {
      set((state) => ({
        steps: [...state.steps, step]
      }));
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

    updateActionable: (id, actionable) => {
      set((state) => ({
        selectedMbprActionables: state.selectedMbprActionables.map((a) =>
          a.id === id ? { ...actionable } : a
        )
      }))
    },

    updateAddendum: (id, addendum) => {
      set((state) => ({
        selectedMbprAddendums: state.selectedMbprAddendums.map((a) =>
          a.id === id ? { ...addendum } : a
        ),
      }));
    },

    updateBatchSize: (id, batchSize) => {
      set((state) => ({
        batchSizes: state.batchSizes.map((bz) =>
          bz.id === id ? { ...batchSize } : bz
        )
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
      set(() => ({ producesItemId: itemId }));

      if (itemId.length === 0) return;

      let item;

      try {
        item = await inventoryActions.items.getOne(itemId);
      } catch (error) {
        console.error('There was an error fetching the selected Item', error);
        return;
      }

      if (item.itemTypeId === itemTypes.essentialOil ||
        item.itemTypeId === itemTypes.fragranceOil) {

        const efo = await productionActions.templates.scent(itemId)

        if (!efo) {
          throw new Error('There was an issue with getting the Essential or Fragrance Oil Ready.')
        }
        set(() => ({
          step: 2,
          selectedMbpr: efo.mbpr,
          selectedStep: efo.step,

        }));

        return;
      }

      set(() => ({ producesItem: item }));

      // Finally logic (executed only if the item type check passes)
      set(() => ({ step: 1 }));
    },

    // setProducesItem: async (itemId) => {

    //     set(() => ({ producesItemId: itemId }))

    //     if (itemId.length === 0) return

    //     try {
    //         const item = await inventoryActions.items.getOne(itemId);

    //        
    //         if (item.itemTypeId === staticRecords.inventory.itemTypes.essentialOil || item.itemTypeId === staticRecords.inventory.itemTypes.fragranceOil) {
    //             console.log('runme instead')
    //             return;
    //         }

    //         set(() => ({ producesItem: item }));

    //     } catch (error) {
    //         console.error('There was an error fetching the selected Item', error)
    //     } finally {
    //         set(() => ({
    //             step: 1
    //         }))
    //     }
    // },

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
      // not yet 

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
      try {
        const actionables = await productionActions.mbprs.actionables.getAllByMbpr(step.mbprId);
        set(() => ({
          selectedMbprActionables: actionables,
        }))
      } catch (error) {
        console.error(error)
      }
    },

    setSelectedInstruction: (instruction) => {
      set(() => ({ selectedInstruction: instruction }))
    },

    setSelectedAddendum: (addendum) => {
      set(() => ({ selectedAddendum: addendum }))
    },

    setSelectedActionable: (actionable) => {
      set(() => ({ selectedActionable: actionable }))
    },

    setAddendumTypes: (addendums) => {
      set(() => ({ addendumTypes: addendums }))
    },

    setActionableTypes: (types) => {
      set(() => ({ actionableTypes: types }))
    },

    setCompoundingVessels: (vessels) => {
      set(() => ({ compoundingVessels: vessels, }))
    },

    setSelectedBatchSize: (batchSize) => {
      set(() => ({ selectedBatchSize: batchSize }))
    },

    setBatchSizes: (batchSizes) => {
      set(() => ({ batchSizes, }))
    },

    getBatchSizes: async (mbprId: string) => {

      try {
        const batchSizes = await productionActions.mbprs.batchSizes.getAllByMbpr(mbprId);

        set(() => ({ batchSizes, }))
      } catch (error) {
        console.error(error);
      }
    },


  },

}))

export const useMbprWizardActions = () => useMbprWizardSelection((state) => state.actions) 
