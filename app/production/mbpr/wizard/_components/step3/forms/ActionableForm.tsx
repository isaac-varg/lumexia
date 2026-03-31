import Form from '@/components/Form';
import { useMbprWizardActions, useMbprWizardSelection } from '@/store/mbprWizardSlice';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Heading from '../details/Heading';
import { TextUtils } from '@/utils/text';
import { Prisma } from '@prisma/client';
import { productionActions } from '@/actions/production';
import { recordStatuses } from '@/configs/staticRecords/recordStatuses';
import { stepActionableTypes } from '@/configs/staticRecords/stepActionableTypes';
import { createActivityLog } from '@/utils/auxiliary/createActivityLog';

type Inputs = {
  actionableTypeId: string;
  required: boolean;
  verificationRequired: boolean;
  secondaryVerificationRequired: boolean;
}

const ActionableForm = () => {

  const { selectedStep, isNewForFormPanel, actionableTypes, selectedActionable, selectedMbpr } = useMbprWizardSelection()
  const { addActionable, updateActionable, removeActionable, setFormPanelMode } = useMbprWizardActions()

  const typeOptions = actionableTypes.map((t) => ({ value: t.id, label: TextUtils.properCase(t.name) }))

  const form = useForm<Inputs>();


  const handleDelete = async () => {
    if (!selectedActionable) return;
    await productionActions.mbprs.actionables.update(selectedActionable.id, {
      recordStatusId: recordStatuses.archived,
    });
    if (selectedMbpr && selectedStep) await createActivityLog('Removed Actionable', 'mbpr', selectedMbpr.id, { context: `Removed actionable from step ${selectedStep.sequence}` })
    removeActionable(selectedActionable.id);
    setFormPanelMode('default');
  }

  const handleSubmit = async (data: Inputs) => {

    if (!selectedStep) return;
    if (isNewForFormPanel) {

      const payload: Prisma.StepActionableUncheckedCreateInput = {
        stepId: selectedStep.id,
        actionableTypeId: data.actionableTypeId,
        required: data.required,
        verificationRequired: data.verificationRequired,
        secondaryVerificationRequired: data.secondaryVerificationRequired,
        recordStatusId: recordStatuses.active,
      }

      const response = await productionActions.mbprs.actionables.create(payload);

      if (selectedMbpr) await createActivityLog('Added Actionable', 'mbpr', selectedMbpr.id, { context: `Added ${response.actionableType.name} actionable to step ${selectedStep.sequence}` })
      addActionable(response);
    } else {

      if (!selectedActionable) return;
      const payload: Prisma.StepActionableUncheckedUpdateInput = {
        actionableTypeId: data.actionableTypeId,
        required: data.required,
        verificationRequired: data.verificationRequired,
        secondaryVerificationRequired: data.secondaryVerificationRequired,
      }

      const response = await productionActions.mbprs.actionables.update(selectedActionable.id, payload)

      if (selectedMbpr && selectedStep) await createActivityLog('Updated Actionable', 'mbpr', selectedMbpr.id, { context: `Updated actionable on step ${selectedStep.sequence}` })
      updateActionable(selectedActionable.id, response);
    }
  }

  useEffect(() => {
    if (selectedActionable) {
      form.reset(selectedActionable);
    } else {
      form.reset({
        actionableTypeId: stepActionableTypes.completeStep,
        required: true,
        verificationRequired: false,
        secondaryVerificationRequired: false,

      })
    }
  }, [selectedActionable, form])

  return (
    <div className='flex flex-col gap-y-6'>

      <Form.Root onSubmit={handleSubmit} form={form}>
        <div className='flex flex-col'>
          <Heading>Actions</Heading>
          <div className='flex flex-col gap-y-1'>
            <button type="submit" className='btn btn-success'>Save</button>
            {!isNewForFormPanel && <button type="button" onClick={handleDelete} className='btn btn-error'>Delete</button>}
          </div>
        </div>


        <Form.Select
          form={form}
          fieldName='actionableTypeId'
          label='Action Type'
          options={typeOptions}
        />

        <Form.Toggle
          form={form}
          fieldName='required'
          label='Required'
        />

        <Form.Toggle
          form={form}
          fieldName='verificationRequired'
          label='Verification Required'
        />

        <Form.Toggle
          form={form}
          fieldName='secondaryVerificationRequired'
          label='Secondary Verification Required'
        />


      </Form.Root>
    </div>
  )
}

export default ActionableForm
