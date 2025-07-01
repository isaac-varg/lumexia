import { usePricingTemplateWizardSelection } from "@/store/pricingTemplateWizardSlice"
import FinishedProductViewAllMode from "./FinishedProductViewAllMode";
import FinishedProductAddMode from "./FinishedProductAddMode";

const StepFinishedProduct = () => {
    const { step, finishedProductStepMode } = usePricingTemplateWizardSelection()

    if (step !== 1) return false;

    return (
        <>

            {finishedProductStepMode === 'all' && <FinishedProductViewAllMode />}
            {finishedProductStepMode === 'add' && <FinishedProductAddMode />}



        </>


    )
}

export default StepFinishedProduct
