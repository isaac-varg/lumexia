import { qualityActions } from "@/actions/quality"
import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll"
import SectionTitle from "@/components/Text/SectionTitle"
import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice"

const Type = () => {

  const { examinationTypes, qcRecord } = useQcExaminationSelection()
  const { setSelectedExaminationType, setStep } = useQcExaminationActions()

  const handleSelection = async (type: ExaminationType) => {
    if (!qcRecord) return;
    await qualityActions.qc.records.update(qcRecord.id, {
      examinationTypeId: type.id,
    });
    setSelectedExaminationType(type)
    setStep(2)
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle>Select Examination Type</SectionTitle>

      <div className="grid grid-cols-3 gap-6">
        {examinationTypes.map(et => {
          return (
            <button
              key={et.id}
              onClick={() => handleSelection(et)}
              className="btn btn-primary min-h-40 btn-xl">
              {et.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Type
