import bprActions from "@/actions/production/bprActions"
import { useProductionSelection } from "@/store/productionSlice"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import StepList from "./StepList"
import StepDetails from "./StepDetails"
import { bprStatuses } from "@/configs/staticRecords/bprStatuses"
import CompoundingHeader from "./CompoundingHeader"

const compounding = bprStatuses.compounding

const Compounding = () => {
  const { bpr, selectedStep } = useProductionSelection()
  const notStarted = bpr?.bprStatusId !== compounding
  const router = useRouter()


  useEffect(() => {
    const updateBpr = async () => {
      if (!bpr) return;
      await bprActions.update({ id: bpr.id }, { bprStatusId: compounding })
      router.refresh()
    }

    if (notStarted) {
      updateBpr()
    }
  }, [bpr, router])


  return (
    <div className="flex flex-col gap-6">
      <CompoundingHeader />
      {!selectedStep && <StepList />}
      {selectedStep && <StepDetails />}
    </div>

  )
}

export default Compounding
