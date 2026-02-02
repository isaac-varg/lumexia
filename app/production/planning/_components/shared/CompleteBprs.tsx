"use client"

import { handleCompletedBprs } from "@/actions/queries/completedBprs/handleCompletedBprs"
import { bprStatuses } from "@/configs/staticRecords/bprStatuses"
import useToast from "@/hooks/useToast"
import { useBprPlanningSelection } from "@/store/bprPlanningSlice"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { TbChecks } from "react-icons/tb"

const CompleteBprs = () => {

  const { bprs } = useBprPlanningSelection()
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {

    const result = Object.values(bprs).some(bprArray =>
      bprArray.some(bpr => bpr.bprStatusId === bprStatuses.completed)
    );
    setHasCompleted(result)
  }, [bprs, setHasCompleted])

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const result = await handleCompletedBprs();
      router.refresh()

      const { succeeded, failed } = result;

      if (failed.length === 0) {
        toast("BPRs Processed", `${succeeded.length} BPR${succeeded.length === 1 ? '' : 's'} processed successfully`, "success");
      } else if (succeeded.length === 0) {
        toast("BPR Processing Failed", `All ${failed.length} BPR${failed.length === 1 ? '' : 's'} failed — check BPR notes for details`, "error");
      } else {
        toast("BPR Processing Partial", `${succeeded.length} succeeded, ${failed.length} failed — check BPR notes for details`, "error");
      }
    } catch (error) {
      console.error(error);
      toast("Error", "An unexpected error occurred while processing BPRs", "error");
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
