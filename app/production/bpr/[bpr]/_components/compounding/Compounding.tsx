import bprActions from "@/actions/production/bprActions"
import { staticRecords } from "@/configs/staticRecords"
import { useProductionSelection } from "@/store/productionSlice"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import StepList from "./StepList"
import StepDetails from "./StepDetails"
import Instructions from "./Instructions"

const compounding = staticRecords.production.bprStatuses.compounding

const Compounding = () => {
  const { bpr } = useProductionSelection()
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
    <div className="grid grid-cols-5 gap-6">

      <StepList />
      <StepDetails />

    </div>

  )
}

export default Compounding
