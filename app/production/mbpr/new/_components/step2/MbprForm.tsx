import mbprActions from '@/actions/production/mbprActions'
import Dialog from '@/components/Dialog'
import Form from '@/components/Form'
import useDialog from '@/hooks/useDialog'
import useProductionWizard from '@/hooks/useProductionWizard'
import { MasterBatchProductionRecord } from '@/types/masterBatchProductionRecord'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import { getRecordStatuses } from '@/utils/getters/getRecordStatuses'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'


interface MbprFormInputs {
  recordStatusId: string 
  versionLabel: string 
  estimatedTotalTime: number
}

type MbpRFormProps = {
  mode: 'create' | 'edit'
  mbpr?: MasterBatchProductionRecord
}

const MbprForm = ({ mode, mbpr }: MbpRFormProps) => {
  const [statusOptions, setStatusOptions] = useState([])
  const defaultValues: any = {
    versionLabel: mbpr ? mbpr.versionLabel : '',
    recordStatusId: mbpr ? mbpr.recordStatusId : '',
    estimatedTotalTime: mbpr ? mbpr.estimatedTotalTime : 0
  }
  const { selectedProducibleMaterial, revalidate } = useProductionWizard()
  const { resetDialogContext } = useDialog();

  const form = useForm<MbprFormInputs>({ defaultValues })

  const handleSubmit = async (data: MbprFormInputs) => {

    if (!selectedProducibleMaterial) {
      throw new Error("No Selected Producible Item.")
    }


    // create the payload
    const submitData = {
      producesItemId: selectedProducibleMaterial?.id,
      recordStatusId: data.recordStatusId,
      estimatedTotalTime: data.estimatedTotalTime,
      versionLabel: data.versionLabel
    }

    // helper function to update a record
    const submitUpdate = async () => {
      if (!mbpr) {
        throw new Error("Cannot update without selected MBPR")
      }
      const response = await mbprActions.update({ id: mbpr.id }, submitData)
      finish(response)
    }

    const finish = (responseData: any ) => {
      createActivityLog(`${mbpr ? 'modifyMbpr' : 'createMbpr'}`, 'mbpr',  responseData.id, {context: `${mbpr ? 'Updated' : 'Created'} MBPR`, label: responseData.label }) 
      resetDialogContext()
      revalidate()
    }

    if (mode === 'edit') {
      submitUpdate()
      return;
    }


    const newMbpr = await mbprActions.createNew(submitData)
    finish(newMbpr)


  }


  useEffect(() => {
    const getStatusSelectionOptions = async () => {
      const options = await getRecordStatuses('selectOption')

      setStatusOptions(options)
    }

    getStatusSelectionOptions();
  }, [])

  return (
    <Dialog.Root identifier={mbpr ? `mbprEdit${mbpr.id}` : 'mbprNew'}>
      <Form.Root form={form} onSubmit={handleSubmit}>
        <Form.Text
          form={form}
          label='Version Label'
          fieldName='versionLabel'
          required
        />

        <Form.Number
          form={form}
          label='Estimated Total Time'
          fieldName='estimatedTotalTime'
          required
        />
        <Form.Select
          form={form}
          label='Status'
          fieldName='recordStatusId'
          options={statusOptions}
        />
        <Form.ActionRow form={form} />
      </Form.Root>
    </Dialog.Root>
  )
}

export default MbprForm
