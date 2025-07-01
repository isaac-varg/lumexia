import { accountingActions } from "@/actions/accounting"
import { PricingTemplateAuxiliaryPayload } from "@/actions/accounting/finishedProducts/templates/auxiliaries/create"
import { PricingTemplatePayload } from "@/actions/accounting/finishedProducts/templates/create"
import { PricingTemplateFinishedProductPayload } from "@/actions/accounting/finishedProducts/templates/finishedProducts/create"
import { PricingTemplate } from "@/actions/accounting/finishedProducts/templates/getAll"
import itemTypeActions from "@/actions/inventory/itemTypeActions"
import { ItemType } from "@prisma/client"
import { create } from "zustand"


export type IntermediateTemplateFinishedProduct = PricingTemplateFinishedProductPayload & {
    isExisting: boolean
}

export type ExistingFinishedProduct = PricingTemplate['finishedProducts'][number]


export type IntermediateAuxiliary = PricingTemplateAuxiliaryPayload & {
    isExisting: boolean
}

export type FinishedProductStepMode = "all" | 'add' | 'view'

type State = {
    existingTemplate: PricingTemplate | null
    existingFinishedProducts: ExistingFinishedProduct[],
    finishedProductStepMode: FinishedProductStepMode,
    isExistingTemplate: boolean
    intermediateAuxiliaries: IntermediateAuxiliary[]
    intermediateTemlateData: PricingTemplatePayload | null
    itemTypes: ItemType[]
    step: number
    selectedFinishedProduct: ExistingFinishedProduct | null
}

type Actions = {
    actions: {
        nextStep: () => void;
        getItemTypes: () => void;
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
    intermediateAuxiliaries: [],
    intermediateTemlateData: null,
    existingTemplate: null,
    existingFinishedProducts: [],
    isExistingTemplate: false,
    selectedFinishedProduct: null,
    step: 0,


    actions: {

        getExistingTemplate: async (templateId) => {
            try {
                const template = await accountingActions.finishedProducts.templates.getOne(templateId);
                set(() => ({ existingTemplate: template }))
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

        nextStep: () => {
            set((state) => ({ step: state.step + 1 }))
        },

        setAuxiliaries: () => {
            //            const { selectedFinishedProduct } = get();
            //            if (!selectedFinishedProduct) return;
            //
            //
            //            const transformedAuxes: IntermediateAuxiliary[] = selectedFinishedProduct.auxiliaries.map(aux => ({
            //                ...aux,
            //                isExisting: true,
            //            }));
            //            set(() => ({ intermediateAuxiliaries: transformedAuxes }))
            //
        },

        setFinishedProducts: () => {
            const { existingTemplate } = get()
            if (!existingTemplate) return

            set(() => ({ existingFinishedProducts: existingTemplate.finishedProducts }))
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
