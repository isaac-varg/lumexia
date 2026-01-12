import { accountingActions } from '@/actions/accounting';
import Form from '@/components/Form'
import { usePricingSharedActions, usePricingSharedSelection } from '@/store/pricingSharedSliceback';
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form';


type Inputs = {
  containerItemId: string;
  containerCost: number;
  fillLaborCost: number;
  shippingCost: number;
  freeShippingCost: number;
}

const NewConsumerContainer = ({ setMode }: { setMode: Dispatch<SetStateAction<'default' | 'new'>> }) => {

  const form = useForm<Inputs>();
  const { packagingItems } = usePricingSharedSelection()
  const { getPackagingItems } = usePricingSharedActions()
  const packagingItemOptions = packagingItems.length !== 0 ? packagingItems.map((item) => { return ({ value: item.id, label: item.name }) }) : [];


  useEffect(() => {
    if (packagingItems.length === 0) {
      getPackagingItems()

    }
  }, [getPackagingItems, packagingItems.length]);


  const handleSubmit = async (data: Inputs) => {
    await accountingActions.consumerContainers.createOne(data);
    setMode('default');
  }

  if (packagingItems.length === 0) return false


  return (
    <div>
      <Form.Root
        form={form}
        onSubmit={handleSubmit}
      >

        <Form.Select
          form={form}
          label='Packaging Item'
          fieldName='containerItemId'
          options={packagingItemOptions}
        />

        <Form.Number
          form={form}
          label='Container Cost'
          fieldName='containerCost'
          required
        />

        <Form.Number
          form={form}
          label='Fill Labor Cost'
          fieldName='fillLaborCost'
          required
        />

        <Form.Number
          form={form}
          label='Shipping Cost'
          fieldName='shippingCost'
          required
        />

        <Form.Number
          form={form}
          label='Free Shipping Cost'
          fieldName='freeShippingCost'
          required
        />

        <div className='flex justify-end gap-x-2'>
          <button className='btn btn-warning' type='button' onClick={() => setMode('default')}>Cancel</button>
          <button className='btn btn-success' type='submit'>Save</button>


        </div>
      </Form.Root>

    </div>
  )
}

export default NewConsumerContainer
