"use client"

import { useMbprWizardActions, useMbprWizardSelection } from "@/store/mbprWizardSlice"
import { useEffect } from "react"
import StepPanel from "./steps/StepPanel"
import StepDetailsPanel from "./details/StepDetailsPanel"
import FormPanel from "./forms/FormPanel"

const ProductionStep = () => {
    const { isRevalidating, step, selectedMbpr, steps, isNewlyCreated } = useMbprWizardSelection()
    const { getSteps } = useMbprWizardActions()

    useEffect(() => {
        if (steps.length === 0 && !isNewlyCreated && selectedMbpr) {
            getSteps(selectedMbpr.id)
        }
    }, [steps, isNewlyCreated, selectedMbpr, isRevalidating])

    if (step !== 2 || !selectedMbpr || !steps) return null

    return (
        <div className="grid  grid-cols-4 gap-x-8">
            <StepPanel />
            <StepDetailsPanel />
            <FormPanel />
        </div>
    )
}

export default ProductionStep

