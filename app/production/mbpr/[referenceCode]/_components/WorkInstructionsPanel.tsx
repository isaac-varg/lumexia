import { Mbpr } from "@/actions/production/mbpr/getOneMbpr"
import Card from "@/components/Card"
import { recordStatuses } from "@/configs/staticRecords/recordStatuses"

const WorkInstructionsPanel = ({ steps }: { steps: Mbpr['BatchStep'] }) => {

    const activeSteps = steps.filter((s) => s.recordStatusId !== recordStatuses.archived)
    const stepsWithInstructions = activeSteps.filter((s) =>
        s.StepInstruction.filter(i => i.recordStatusId !== recordStatuses.archived).length > 0
    )

    return (
        <Card.Root>
                <Card.Title>Work Instructions</Card.Title>

                {stepsWithInstructions.length === 0 ? (
                    <p className="font-poppins text-lg font-normal">No work instructions have been added.</p>
                ) : (
                    <div className="flex flex-col gap-y-6">
                        {stepsWithInstructions.map((step) => (
                            <div key={step.id} className="flex flex-col gap-y-3">
                                <h2 className="font-poppins font-semibold text-lg">
                                    Step {step.sequence} — {step.label}
                                    <span className="ml-2 font-normal text-base text-gray-500">{step.phase}</span>
                                </h2>
                                <ul className="flex flex-col gap-y-2">
                                    {step.StepInstruction.filter(i => i.recordStatusId !== recordStatuses.archived).map((instruction, idx) => (
                                        <li key={instruction.id} className="flex gap-x-3 items-start border border-cararra-700 rounded-lg p-4">
                                            <span className="font-poppins font-semibold text-sm text-gray-400 mt-0.5 w-5 shrink-0">{idx + 1}.</span>
                                            <span className="font-poppins text-base">{instruction.instructionContent}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
        </Card.Root>
    )
}

export default WorkInstructionsPanel
