import { useQcExaminationSelection } from "@/store/qcExaminationSlice"

const ExaminationStep = () => {

    const { wizardStep } = useQcExaminationSelection()

    if (wizardStep !== 1) return false;
    return (
        <div>


        </div>
    )
}

export default ExaminationStep
