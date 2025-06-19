'use client'
import { useQcExaminationSelection } from "@/store/qcExaminationSlice"
import StateSetter from "./StateSetter"
import ExaminationType from "./panels/ExaminationType"
import ParametersPanel from "./panels/ParametersPanel"
import ParameterResultsPanel from "./panels/ParameterResultsPanel"
import NotesPanel from "./panels/NotesPanel"
import CompletePanel from "./panels/CompletePanel"
import RecordStatusPanel from "./panels/RecordStatusPanel"

const ExaminationStep = () => {

    const { wizardStep, itemParameters } = useQcExaminationSelection()

    console.log(itemParameters)

    if (wizardStep !== 1) return false;

    return (
        <div className="grid grid-cols-2 gap-6">

            <StateSetter />

            <ExaminationType />
            <ParametersPanel />
            <ParameterResultsPanel />
            <NotesPanel />
            <RecordStatusPanel />
            <CompletePanel />

        </div>
    )
}

export default ExaminationStep
