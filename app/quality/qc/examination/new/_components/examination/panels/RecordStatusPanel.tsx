import { QcRecordStatus } from "@/actions/quality/qc/records/statuses/getAll"
import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import { staticRecords } from "@/configs/staticRecords"
import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice"

const RecordStatusPanel = () => {

    const { examinationStatuses } = useQcExaminationSelection()
    return (
        <Panels.Root>

            <Text.SectionTitle size="small">Examination Status</Text.SectionTitle>


            {examinationStatuses.filter(status => status.id !== staticRecords.quality.records.statuses.open).map(status => <StatusButton key={status.id} status={status} />)}


        </Panels.Root>
    )
}

const StatusButton = ({ status }: { status: QcRecordStatus }) => {

    const { selectedExaminationStatusId } = useQcExaminationSelection()
    const { setSelectedExaminationStatusId } = useQcExaminationActions()

    const isSelected = status.id === selectedExaminationStatusId

    return (
        <button onClick={() => setSelectedExaminationStatusId(status.id)} className={`btn  btn-lg ${isSelected ? 'btn-success' : ''}`}>{status.name}</button>
    )
}

export default RecordStatusPanel
