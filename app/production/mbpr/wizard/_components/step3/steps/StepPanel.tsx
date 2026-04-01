import { Step } from '@/actions/production/mbpr/steps/getAllByMbpr';
import { useMbprWizardActions, useMbprWizardSelection } from '@/store/mbprWizardSlice'
import { recordStatuses } from '@/configs/staticRecords/recordStatuses'
import { stepActionableTypes } from '@/configs/staticRecords/stepActionableTypes'
import { groupByProperty } from '@/utils/data/groupByProperty'
import React from 'react'
import AddStepForm from './AddStepForm';
import useDialog from '@/hooks/useDialog';

const bgColors = ["#EDEDE9", "#D6CCC2", "#F5EBE0", "#E3D5CA", "#D5BDAF", "#EDEDE9", "#D6CCC2", "#F5EBE0", "#E3D5CA", "#D5BDAF"];

const StepPanel = () => {

  const { steps, selectedStep, selectedMbprActionables } = useMbprWizardSelection()
  const { setSelectedStep } = useMbprWizardActions()
  const { showDialog } = useDialog()
  const activeSteps = steps.filter((s) => s.recordStatusId !== recordStatuses.archived)
  const activeActionables = selectedMbprActionables.filter((a) => a.recordStatusId !== recordStatuses.archived)
  const groupedSteps = groupByProperty(activeSteps, "phase")

  const stepsWithoutComplete = activeSteps.filter((step) =>
    !activeActionables.some((a) => a.stepId === step.id && a.actionableTypeId === stepActionableTypes.completeStep)
  )
  const hasIncompleteSteps = stepsWithoutComplete.length > 0

  return (
    <div className='flex flex-col gap-y-6 col-span-1'>
      <AddStepForm />
      <div className='flex justify-between items-center'>
        <h1 className='font-poppins text-lg font-semibold'>
          Steps & Phases
        </h1>

        <button className='btn btn-neutral' disabled={hasIncompleteSteps} onClick={() => showDialog("addStepForm")}>Add Step</button>

      </div>

      {hasIncompleteSteps && (
        <div className='bg-warning/20 border border-warning text-warning-content rounded-xl p-4 text-sm font-medium'>
          The following steps are missing a <strong>Complete Step</strong> actionable: {stepsWithoutComplete.map((s) => `Step ${s.sequence}`).join(', ')}.
          Please add the actionable before creating a new step.
        </div>
      )}

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
