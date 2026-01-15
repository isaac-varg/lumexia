import { Wizard } from "@/components/Wizard"
import { usePricingSharedSelection } from "@/store/pricingSharedSlice"
import FinishedProductDetails from "./FinishedProductDetails"
import Auxiliaries from "./Auxiliaries"

const Modify = () => {


  const { modifyMode, selectedFinishedProduct, modifyCurrentStep } = usePricingSharedSelection()



  return (
    <div className="flex flex-col gap-6">

      <Wizard.Steps>
        <Wizard.StepLabel indicator="0" currentStep={modifyCurrentStep} step={0} label="Finished Product Details" />
        <Wizard.StepLabel indicator="1" currentStep={modifyCurrentStep} step={1} label="Auxiliaries" />
      </Wizard.Steps>


      <FinishedProductDetails />
      <Auxiliaries />

    </div>
  )
}

export default Modify
