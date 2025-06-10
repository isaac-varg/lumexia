import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import MissingParameters from "./MissingParameters"
import { QcItemParameter } from "@/actions/quality/qc/parameters/getAllByItem"

const ParametersPanel = () => {

    const { itemParameters } = useQcExaminationSelection()

    return (
        <Panels.Root span={1}>
            <Text.SectionTitle size="small">Parameters</Text.SectionTitle>

            {itemParameters.length === 0 && <MissingParameters />}

            {itemParameters.map(ip => <ItemParameterButton key={ip.id} parameter={ip} />)}






        </Panels.Root>
    )
}

const ItemParameterButton = ({ parameter }: { parameter: QcItemParameter }) => {

    const { selectedItemParameter } = useQcExaminationSelection()
    const { setSelectedItemParameter, hasParameterResult } = useQcExaminationActions()
    const isSelected = selectedItemParameter?.id === parameter.id
    const hasResult = hasParameterResult(parameter.parameterId)

    return (
        <button onClick={() => setSelectedItemParameter(parameter)} className={`btn btn-lg ${isSelected ? 'btn-primary' : (hasResult ? 'btn-success' : '')}`}>{parameter.parameter.name}</button>
    )
}

export default ParametersPanel
