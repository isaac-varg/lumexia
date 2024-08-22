import billOfMaterialActions from '@/actions/production/billOfMaterials';
import ActionButton from '@/components/ActionButton'
import Dialog from '@/components/Dialog';
import Form from '@/components/Form';
import useProductionWizard from '@/hooks/useProductionWizard';
import { Item } from '@/types/item';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useWizard } from 'react-use-wizard'
import { createBomItem } from '../../../_functions/createBomItem';
import { createActivityLog } from '@/utils/auxiliary/createActivityLog';
import useDialog from '@/hooks/useDialog';

interface Inputs {
  identifier: string
  concentration: number
}

const Step3B = ({ selectedItem }: { selectedItem: Item }) => {

  const { previousStep } = useWizard();
  const { revalidate, selectedMbpr, selectedBatchStep } = useProductionWizard();
  const { resetDialogContext } = useDialog();

  const form = useForm()

  const handleSubmit = async (data: Inputs) => {

    const { identifier, concentration } = data;

    if (!selectedMbpr || !selectedBatchStep) {
      throw new Error("Missing selected MBPR or BatchStep")
    }

    const payload = {
      itemId: selectedItem.id,
      mbprId: selectedMbpr.id,
      stepId: selectedBatchStep.id,
      identifier,
      concentration,
    }

    await createBomItem(payload)
    await createActivityLog('createBOMItem', 'mbpr', selectedMbpr.id, { context: `Added ${selectedItem.name} to ${selectedBatchStep.label}` })

    resetDialogContext();
    revalidate();

  }

  return (
    <div className='flex flex-col'>

      <Dialog.Title>Item Usage Details</Dialog.Title>

      <Form.Root form={form} onSubmit={handleSubmit} >

        <Form.Text
          form={form}
          label='Identifier'
          fieldName='identifier'
          required
        />

        <Form.Number
          form={form}
          label={`Concentration (%w/w)`}
          fieldName='concentration'
          required

        />



        <div className='flex justify-center gap-x-2' >
          <ActionButton color='cararra' onClick={() => previousStep()}>Back</ActionButton>
          <ActionButton buttonType='submit' >Save</ActionButton>
        </div>


      </Form.Root>
    </div>

  )
}

export default Step3B
