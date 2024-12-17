import { BatchProductionRecord } from "@/types/batchProductionRecord"
import { getBatchSteps } from "./_functions/getBatchSteps"
import AllStepsPanel from "./_components/AllStepsPanel"
import NextStepPanel from "./_components/NextStepPanel"
import { sortByProperty } from "@/utils/data/sortByProperty"
import { getCurrentStep } from "./_functions/getCurrentStep"
import Confetti from "@/components/Confetti/Confetti"
import { updateBatch } from "./_functions/updateBatch"

const CompoundingPanel = async ({ bpr }: { bpr: BatchProductionRecord }) => {

    const steps = await getBatchSteps(bpr.id)

    const sortedSteps = sortByProperty(steps, "batchStep.sequence")
    const currentStep = await getCurrentStep(sortedSteps)



    if (!currentStep) {
        updateBatch(bpr.id)
        return <Confetti />
    }

    return (
        <div className="flex flex-col gap-4">
            <NextStepPanel steps={steps as any} />
            <AllStepsPanel steps={steps as any} />
        </div>
    )
}

export default CompoundingPanel
