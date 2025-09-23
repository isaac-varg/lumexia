import StepContainer from "./_components/shared/StepContainer"
import StepTrack from "./_components/shared/StepTrack"
import { inventoryActions } from "@/actions/inventory"
import StateSetter from "./_components/state/StateSetter"



const ConductExaminationPage = async () => {

  const [lots] = await Promise.all([
    await inventoryActions.lots.getAll(),
  ])

  return (
    <div className="flex flex-col gap-y-6">
      <StateSetter
        lots={lots}
      />
      <StepTrack />
      <StepContainer />
    </div>
  )
}

export default ConductExaminationPage
