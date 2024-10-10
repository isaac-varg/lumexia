import { BatchProductionRecord } from "@/types/batchProductionRecord"
import { getBatchSteps } from "./_functions/getBatchSteps"
import AllStepsPanel from "./_components/AllStepsPanel"
import NextStepPanel from "./_components/NextStepPanel"

const CompoundingPanel = async ({ bpr }: { bpr: BatchProductionRecord }) => {

        const steps = await getBatchSteps(bpr.id)

        return (
                <div className="flex flex-col gap-4">
                        <NextStepPanel steps={steps} />
                        <AllStepsPanel steps={steps} />
                </div>
        )
}

export default CompoundingPanel
