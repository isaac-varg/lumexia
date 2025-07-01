'use client'
import { usePricingTemplateWizardActions, usePricingTemplateWizardSelection } from "@/store/pricingTemplateWizardSlice";
import { useEffect } from "react";

const StateSetter = ({ isExisting, templateId }: { isExisting: boolean, templateId: string | null | undefined }) => {

    const { itemTypes, isExistingTemplate, existingTemplate } = usePricingTemplateWizardSelection()
    const { getItemTypes, setIsExistingTemplate, getExistingTemplate, setFinishedProducts, setAuxiliaries } = usePricingTemplateWizardActions()

    useEffect(() => {
        if (itemTypes.length === 0) {
            getItemTypes();
        }
    }, [])

    useEffect(() => {
        if (isExisting) {
            if (!templateId) {
                throw new Error('A TemplateId is required for an existing pricing template')
            }
            setIsExistingTemplate(true);
            getExistingTemplate(templateId)
            return;
        }

        setIsExistingTemplate(false)
    }, [isExisting, templateId])

    useEffect(() => {
        
        setFinishedProducts()
        setAuxiliaries();


    }, [isExistingTemplate, existingTemplate])




    return false;
}

export default StateSetter
