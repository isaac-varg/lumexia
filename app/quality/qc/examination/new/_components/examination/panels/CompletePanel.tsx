import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { completeExamination } from "../../../_functions/completeExamination"

const CompletePanel = () => {

    const { isValidated, parameterResults, selectedExaminationType, selectedLotId, selectedExaminationStatusId, examinationRecordId } = useQcExaminationSelection()
    const { conductValidation } = useQcExaminationActions()
    const router = useRouter()

    const handleSubmit = async () => {
        if (!isValidated || !examinationRecordId) return;

        const resultsArray = Object.values(parameterResults)

        await completeExamination(examinationRecordId, resultsArray, selectedExaminationStatusId)

        router.back()


    }

    const handleBack = () => {
        router.back()
    }

    useEffect(() => {
        conductValidation();
    }, [parameterResults, selectedExaminationType, selectedLotId, selectedExaminationStatusId])

    return (
        <Panels.Root span={1}>

            <Text.SectionTitle size="small">Actions</Text.SectionTitle>

            <div className="grid grid-cols-2 gap-8">
                <button className={`btn h-32 ${isValidated ? 'btn-success' : 'btn-disabled'}`} onClick={() => handleSubmit()}>Complete</button>
                <button className="btn btn-warning h-32" onClick={() => handleBack()}>Go Back</button>

            </div>
        </Panels.Root>
    )
}

export default CompletePanel
