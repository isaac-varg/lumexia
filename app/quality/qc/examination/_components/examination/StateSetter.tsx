import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { useEffect } from "react"

const StateSetter = () => {

    const { getExaminationTypes, getItemParameters } = useQcExaminationActions()
    const { itemParameters, examinationTypes } = useQcExaminationSelection()

    useEffect(() => {
        if (itemParameters.length === 0) {
            getItemParameters()
        }

        if (examinationTypes.length === 0) {
            getExaminationTypes()
        }
    }, [examinationTypes, itemParameters])

    return false;

}

export default StateSetter
