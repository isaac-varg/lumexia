'use client'
import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { useEffect } from "react"

const StateSetter = () => {

    const { getRecordNoteTypes, getExaminationStatuses, getExaminationTypes, getItemParameters, setExaminationRecordId } = useQcExaminationActions()
    const { examinationStatuses, lot, itemParameters, recordNoteTypes, examinationTypes } = useQcExaminationSelection()

    useEffect(() => {
        if (itemParameters.length === 0) {
            getItemParameters()
        }

        if (examinationTypes.length === 0) {
            getExaminationTypes()
        }

        if (recordNoteTypes.length === 0) {
            getRecordNoteTypes()
        }

        if (examinationStatuses.length === 0) {
            getExaminationStatuses()
        }

        setExaminationRecordId()


    }, [lot])

    return false;

}

export default StateSetter
