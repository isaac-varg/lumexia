import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll";
import { Panels } from "@/components/Panels";
import Text from "@/components/Text";
import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice"

const ExaminationTypePanel = () => {

    const { examinationTypes } = useQcExaminationSelection();

    return (
        <Panels.Root span={2} >

            <Text.SectionTitle size="small">Examination Type</Text.SectionTitle>

            <div className="grid grid-cols-3 gap-4">

                {examinationTypes.map(type => <ExamType key={type.id} type={type} />)}
            </div>

        </Panels.Root>
    )
}


const ExamType = ({ type }: { type: ExaminationType }) => {

    const { selectedExaminationType } = useQcExaminationSelection()
    const { setSelectedExaminationType } = useQcExaminationActions()

    const isSelected = type.id === selectedExaminationType?.id

    return (
        <button onClick={() => setSelectedExaminationType(type)} className={`btn  btn-lg ${isSelected ? 'btn-success' : ''}`}>{type.name}</button>
    )
}

export default ExaminationTypePanel
