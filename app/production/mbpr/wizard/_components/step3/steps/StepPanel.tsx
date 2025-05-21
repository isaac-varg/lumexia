import { Step } from '@/actions/production/mbpr/steps/getAllByMbpr';
import { useMbprWizardActions, useMbprWizardSelection } from '@/store/mbprWizardSlice'
import { groupByProperty } from '@/utils/data/groupByProperty'
import React from 'react'
import AddStepForm from './AddStepForm';
import useDialog from '@/hooks/useDialog';

const bgColors = ["#EDEDE9", "#D6CCC2", "#F5EBE0", "#E3D5CA", "#D5BDAF", "#EDEDE9", "#D6CCC2", "#F5EBE0", "#E3D5CA", "#D5BDAF"];

const StepPanel = () => {

    const { steps, selectedStep } = useMbprWizardSelection()
    const { setSelectedStep } = useMbprWizardActions()
    const { showDialog} = useDialog()
    const groupedSteps = groupByProperty(steps, "phase")


    return (
        <div className='flex flex-col gap-y-6 col-span-1'>
        <AddStepForm />
            <div className='flex justify-between items-center'>
                <h1 className='font-poppins text-lg font-semibold'>
                    Steps & Phases
                </h1>

                <button className='btn' onClick={() => showDialog("addStepForm")}>Add Step</button>

            </div>

            {Object.keys(groupedSteps).map((phase, index) => {
                const bgColor = bgColors[index]
                return (
                    <div
                        key={phase}
                        className='p-6 rounded-xl flex flex-col gap-y-4'
                        style={{ backgroundColor: bgColor }}
                    >

                        <h1 className='font-poppins text-md font-semibold'>
                            Phase {phase}
                        </h1>

                        <div className='grid grid-cols-1 gap-2'>
                            {groupedSteps[phase].map((step: Step) => {
                                const isSeleted = selectedStep?.id === step.id;
                                return (

                                    <div
                                        onClick={() => setSelectedStep(step)}
                                        key={step.id}
                                        className={`flex items-center px-4 py-2 rounded-xl opacity-85 ${isSeleted ? 'bg-lilac-200' : 'bg-white'} gap-x-4 hover:cursor-pointer hover:bg-lilac-200`}

                                    >
                                        <div className='bg-neutral-700 font-semibold text-white rounded-full w-8 h-8 p-2 flex items-center justify-center'>
                                            {step.sequence}
                                        </div>
                                        <p className='font-poppins font-medium text-base'>{step.label}</p>
                                    </div>
                                )
                            })}

                        </div>

                    </div>
                )
            })}

        </div>
    )
}

export default StepPanel
