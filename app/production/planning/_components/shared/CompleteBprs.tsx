"use client"

import { handleCompletedBprs } from "@/actions/queries/completedBprs/handleCompletedBprs"
import { bprStatuses } from "@/configs/staticRecords/bprStatuses"
import { useBprPlanningSelection } from "@/store/bprPlanningSlice"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { TbChecks } from "react-icons/tb"

const CompleteBprs = () => {


  const { bprs } = useBprPlanningSelection()
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {

    const result = Object.values(bprs).some(bprArray =>
      bprArray.some(bpr => bpr.bprStatusId === bprStatuses.completed)
    );
    setHasCompleted(result)
  }, [bprs, setHasCompleted])

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await handleCompletedBprs();
      router.refresh()
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }


  if (!hasCompleted) return false;

  return (
    <>
      <button
        onClick={() => handleClick()}
        className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'} flex items-center gap-x-2`}
      >
        <TbChecks className="size-5" />
        Handle Completed BPRS
      </button>
    </>
  )
}

export default CompleteBprs 
