import { useProductionActions, useProductionSelection } from "@/store/productionSlice"
import { ProductionStep } from "../../_actions/compounding/getSteps";

const StepButton = ({ step }: { step: ProductionStep }) => {
  const { setSelectedStep } = useProductionActions()
  const { selectedStep } = useProductionSelection()
  const isSelected = step.id === selectedStep?.id;

  return (
    <button
      onClick={() => setSelectedStep(step)}
      className={`btn ${step.isComplete ? 'btn-success line-through' : isSelected ? 'btn-accent' : 'btn-soft'} flex gap-4 items-center justify-start  btn-lg`}
    >
      <div className="rounded-full bg-secondary  text-center flex items-center justify-center text-secondary-content px-6 py-2 text-sm font-medium">{step.batchStep.sequence}</div>
      <span>{step.batchStep.label}</span>

    </button>
  )
}

export default StepButton
