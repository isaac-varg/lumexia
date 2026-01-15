import { InterimAuxiliaryDetails, usePricingSharedActions, usePricingSharedSelection } from "@/store/pricingSharedSlice"
import { useEffect } from "react";
import AuxiliaryCard from "./AuxiliaryCard";

const Auxiliaries = () => {
  const { interimFinishedProductData, modifyCurrentStep, selectedFinishedProduct } = usePricingSharedSelection()
  const { setInterimFinishedProductDatum } = usePricingSharedActions()
  const keysToExclude = ['finishedProductData'];
  const auxes = Array.from(interimFinishedProductData)
    .filter(([key]) => !keysToExclude.includes(key))
    .map(([key, value]) => (value)) as InterimAuxiliaryDetails[]

  useEffect(() => {
    selectedFinishedProduct?.auxiliaries.breakdown.forEach(a => {
      const data = {
        isNew: false,
        name: a.name,
        id: a.auxiliaryId,
        quantity: a.quantity,
        difficultyAdjustmentCost: a.difficultyAdjustmentCost,
        isDirty: false,
      }
      setInterimFinishedProductDatum(a.auxiliaryId, data);
    })
  }, [selectedFinishedProduct])

  console.log(auxes)

  if (modifyCurrentStep !== 1) return false;

  return (
    <div className="flex flex-col gap-6">

      <div className="grid grid-cols-3 gap-6">
        {auxes.map(aux => <AuxiliaryCard key={aux.id} aux={aux} />)}
      </div>
    </div>
  )
}

export default Auxiliaries
