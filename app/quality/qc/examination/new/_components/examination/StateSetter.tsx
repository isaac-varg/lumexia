'use client'
import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { useEffect, useRef } from "react"

const StateSetter = () => {

    const { getRecordNoteTypes, getExaminationStatuses, getExaminationTypes, getItemParameters, setExaminationRecordId } = useQcExaminationActions()
    const { examinationStatuses, lot, itemParameters, recordNoteTypes, examinationTypes, selectedExaminationType } = useQcExaminationSelection()
    const effectRan = useRef(false);

    useEffect(() => {
        // if (itemParameters.length === 0) {
        //     getItemParameters()
        // }

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

    useEffect(() => {
        getItemParameters()
    }, [lot, selectedExaminationType])

    return false;

}

export default StateSetter
