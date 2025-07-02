'use client'
import { usePricingTemplateWizardActions, usePricingTemplateWizardSelection } from "@/store/pricingTemplateWizardSlice";
import { useEffect } from "react";

const StateSetter = ({ isExisting, templateId }: { isExisting: boolean, templateId: string | null | undefined }) => {

    const { selectedFinishedProduct, packagingItems, itemTypes, isExistingTemplate, existingTemplate } = usePricingTemplateWizardSelection()
    const { getItemTypes, getFinishedProductAuxiliaries, getPackagingItems, resetSteps, setIsExistingTemplate, getExistingTemplate, setFinishedProducts, setAuxiliaries } = usePricingTemplateWizardActions()

    useEffect(() => {
        if (itemTypes.length === 0) {
            getItemTypes();
        }

        if (packagingItems.length === 0) {
            getPackagingItems();
        }
    }, [])

    useEffect(() => {
        if (isExisting) {
            if (!templateId) {
                throw new Error('A TemplateId is required for an existing pricing template')
            }
            setIsExistingTemplate(true);
            getExistingTemplate(templateId)
            resetSteps();
            return;
        }

        resetSteps();
        setIsExistingTemplate(false)
    }, [isExisting, templateId])

    useEffect(() => {

        setFinishedProducts()
        setAuxiliaries();


    }, [isExistingTemplate, existingTemplate])

    useEffect(() => {
        getFinishedProductAuxiliaries()
    }, [selectedFinishedProduct])




    return false;
}

export default StateSetter
