import { accountingActions } from "@/actions/accounting"
import { PackagingItem } from "@/actions/accounting/consumerContainers/getPackagingItems"
import { PricingTemplateAuxiliaryPayload } from "@/actions/accounting/finishedProducts/templates/auxiliaries/create"
import { PricingTemplatePayload } from "@/actions/accounting/finishedProducts/templates/create"
import { PricingTemplateFinishedProductPayload } from "@/actions/accounting/finishedProducts/templates/finishedProducts/create"
import { PricingTemplate } from "@/actions/accounting/finishedProducts/templates/getAll"
import itemTypeActions from "@/actions/inventory/itemTypeActions"
import prisma from "@/lib/prisma"
import { ItemType } from "@prisma/client"
import { create } from "zustand"


export type IntermediateTemplateFinishedProduct = PricingTemplateFinishedProductPayload & {
    isExisting: boolean
}

export type ExistingFinishedProduct = PricingTemplate['finishedProducts'][number]
export type ExistingAuxiliary = ExistingFinishedProduct['auxiliaries'][number]


export type IntermediateAuxiliary = PricingTemplateAuxiliaryPayload & {
    isExisting: boolean
}

export type FinishedProductStepMode = "all" | 'add' | 'view'

type State = {
    existingTemplate: PricingTemplate | null
    existingFinishedProducts: ExistingFinishedProduct[],
    existingAuxiliaries: ExistingAuxiliary[],
    finishedProductStepMode: FinishedProductStepMode,
    isExistingTemplate: boolean
    intermediateAuxiliaries: IntermediateAuxiliary[]
    intermediateTemlateData: PricingTemplatePayload | null
    itemTypes: ItemType[]
    packagingItems: PackagingItem[],
    step: number
    selectedFinishedProduct: ExistingFinishedProduct | null
}

type Actions = {
    actions: {
        nextStep: () => void;
        previousStep: () => void;
        resetSteps: () => void;
        getItemTypes: () => void;
        getPackagingItems: () => void;
        getFinishedProductAuxiliaries: () => void;
        getExistingTemplate: (templateId: string) => void;
        setFinishedProducts: () => void;
        setFinishedProductStepMode: (mode: FinishedProductStepMode) => void;
        setIntermediateTemplateData: (data: PricingTemplatePayload) => void;
        setIsExistingTemplate: (isExisting: boolean) => void;
        setSelectedFinishedProduct: (product: ExistingFinishedProduct | null) => void;
        setAuxiliaries: () => void;
    }
}



export const usePricingTemplateWizardSelection = create<State & Actions>((set, get) => ({
    finishedProductStepMode: 'all',
    itemTypes: [],
    packagingItems: [],
    intermediateAuxiliaries: [],
    intermediateTemlateData: null,
    existingTemplate: null,
    existingFinishedProducts: [],
    existingAuxiliaries: [],
    isExistingTemplate: false,
    selectedFinishedProduct: null,
    step: 0,


    actions: {

        getExistingTemplate: async (templateId) => {
            try {
                const template = await accountingActions.finishedProducts.templates.getOne(templateId);
                set(() => ({ existingTemplate: template, }))
            } catch (error) {
                console.error(error)
            }
        },

        getItemTypes: async () => {
            try {
                const types = await itemTypeActions.getAll();
                set(() => ({ itemTypes: types }))
            } catch (error) {
                console.error(error)
            }
        },

        getPackagingItems: async () => {

            try {
                const packagingItems = await accountingActions.consumerContainers.getPackagingItems();
                set(() => ({ packagingItems, }))
            } catch (error) { console.error(error) }
        },

        nextStep: () => {
            set((state) => ({ step: state.step + 1 }))
        },

        previousStep: () => {
            set((state) => ({ step: state.step - 1 }))
        },

        resetSteps: () => {
            set(() => ({ step: 0 }))
        },


        setAuxiliaries: async () => {
            const { selectedFinishedProduct } = get();
            if (!selectedFinishedProduct) return;
            try {
                const existingAuxiliaries = await accountingActions.finishedProducts.templates.auxiliaries.getByFinishedProduct(selectedFinishedProduct.id)
                set(() => ({ existingAuxiliaries, }))
            } catch (error) {
                console.error(error )
            }


        },

        setFinishedProducts: () => {
            const { existingTemplate } = get()
            if (!existingTemplate) return

            set(() => ({ existingFinishedProducts: existingTemplate.finishedProducts }))
        },

        getFinishedProductAuxiliaries: async () => {

            const { selectedFinishedProduct } = get()
            if (!selectedFinishedProduct) return;
            set(() => ({ existingAuxiliaries: selectedFinishedProduct.auxiliaries }))
        },


        setFinishedProductStepMode: (mode) => {
            set(() => ({ finishedProductStepMode: mode }))
        },
        setIntermediateTemplateData: (data) => {
            set(() => ({ intermediateTemlateData: data }))
        },

        setIsExistingTemplate: (isExisting) => {
            set(() => ({ isExistingTemplate: isExisting }))
        },


        setSelectedFinishedProduct: (product) => {
            set(() => ({ selectedFinishedProduct: product }))
        }


    },



}))

export const usePricingTemplateWizardActions = () => usePricingTemplateWizardSelection((state) => state.actions)
