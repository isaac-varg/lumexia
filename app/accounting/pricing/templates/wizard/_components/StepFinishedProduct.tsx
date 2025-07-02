'use client'
import { usePricingTemplateWizardActions, usePricingTemplateWizardSelection } from "@/store/pricingTemplateWizardSlice"
import FinishedProductViewAllMode from "./FinishedProductViewAllMode";
import FinishedProductAddMode from "./FinishedProductAddMode";
import FinishedProductViewMode from "./FinishedProductViewMode";
import Text from "@/components/Text";

const StepFinishedProduct = () => {
    const { step, finishedProductStepMode } = usePricingTemplateWizardSelection()
    const { previousStep, setFinishedProductStepMode, setSelectedFinishedProduct } = usePricingTemplateWizardActions()

    const handleClearFinishedProduct = () => {
        setSelectedFinishedProduct(null)
        setFinishedProductStepMode('all')
    }

    if (step !== 1) return false;

    return (
        <div className="flex flex-col gap-y-6">
            <div className="flex justify-between">
                <Text.SectionTitle size="small">Finished Products</Text.SectionTitle>
                <div className="flex gap-2">
                    <button className="btn" onClick={() => handleClearFinishedProduct()}> Select Another Finished Product</button>
                    <button className="btn" onClick={() => previousStep()}>Previous Step</button>

                </div>
            </div>


            {finishedProductStepMode === 'all' && <FinishedProductViewAllMode />}
            {finishedProductStepMode === 'add' && <FinishedProductAddMode />}
            {finishedProductStepMode === 'view' && <FinishedProductViewMode />}



        </div >


    )
}

export default StepFinishedProduct
