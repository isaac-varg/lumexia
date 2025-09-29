import { qualityActions } from "@/actions/quality"
import Card from "@/components/Card"
import SectionTitle from "@/components/Text/SectionTitle"
import { staticRecords } from "@/configs/staticRecords"
import { useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { useRouter } from "next/navigation"

const { pass, oos } = staticRecords.quality.records.statuses;

const RecordVerdict = () => {

  const { qcRecord } = useQcExaminationSelection()
  const router = useRouter()

  const handleComplete = async (isInSpec: boolean) => {
    if (!qcRecord) return;

    await qualityActions.qc.records.update(qcRecord.id, {
      statusId: isInSpec ? pass : oos,
    });

    router.push('/quality/qc')

  }

  return (
    <div className="flex flex-col gap-4">

      <SectionTitle>Overall Examination</SectionTitle>

      <Card.Root>

        <div className="grid grid-cols-2 gap-6">
          <button
            className="btn btn-success btn-xl min-h-40"
            onClick={() => handleComplete(true)}
          >
            Pass
          </button>

          <button
            className="btn btn-error btn-xl min-h-40"
            onClick={() => handleComplete(false)}
          >
            Out of Specification
          </button>


        </div>

      </Card.Root>

    </div>
  )
}

export default RecordVerdict
