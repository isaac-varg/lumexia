import StepTrack from "./StepTrack"
import LotSelectionStep from "./lotSelection/LotSelectionStep"

const ExaminationWizard = () => {
    return (
        <div className='min-h-[800px] flex flex-col gap-y-8'>
            <StepTrack />


            <LotSelectionStep />
        </div>
    )
}

export default ExaminationWizard
