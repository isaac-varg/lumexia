import { useQcExaminationActions } from "@/store/qcExaminationSlice"
import RecordVerdict from "./RecordVerdict"

const Verdict = () => {

  const { setStep } = useQcExaminationActions()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <button onClick={() => setStep(2)} className="capitalize min-w-40 btn-xl btn btn-info">Previous Step</button>
      </div>

      <RecordVerdict />

    </div>
  )
}

export default Verdict
