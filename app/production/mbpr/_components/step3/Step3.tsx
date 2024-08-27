import Card from '@/components/Card'
import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import BatchStepForm from './batchStepManagement/BatchStepForm'
import ActionButton from '@/components/ActionButton'
import useDialog from '@/hooks/useDialog'
import { TbEdit, TbPlus } from 'react-icons/tb'
import useProductionWizard from '@/hooks/useProductionWizard'
import { getBatchSteps } from '../../_functions/getBatchSteps'
import BatchStepList from './batchStepManagement/BatchStepList'
import StepDetails from './stepDetails/StepDetails'


const Step3 = () => {
  const { showDialog } = useDialog()
  const { selectedMbpr, revalidateTrigger, selectedBatchStep } = useProductionWizard()
  const [batchSteps, setBatchSteps] = useState()

  useEffect(() => {
    const getData = async () => {
      if (!selectedMbpr) { throw new Error("Selected MBPR does not exist") }

      const data = await getBatchSteps(selectedMbpr?.id)

      setBatchSteps(data)
    }

    getData();
  }, [selectedMbpr, revalidateTrigger])


  return (
    <Card.Root>
      <BatchStepForm />


      <div className='w-full flex gap-x-8 '>

        <div className='w-1/4 flex flex-col gap-y-4'>
          <Layout.Row>
            <Card.Title>Steps</Card.Title>
            <ActionButton onClick={() => showDialog('newBatchStep')}><TbPlus /></ActionButton>
          </Layout.Row>
          {batchSteps &&
            <BatchStepList batchSteps={batchSteps} />
          }
        </div>
        <div className='w-full h-full'>

          <StepDetails />
        </div>

      </div>
    </Card.Root>
  )
}

export default Step3
