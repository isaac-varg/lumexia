import { ItemPricingData } from '@/actions/accounting/pricing/getItemPricingData'
import { Uom } from '@/actions/inventory/getAllUom'
import Form from '@/components/Form'
import { staticRecords } from '@/configs/staticRecords'
import { TextUtils } from '@/utils/text'
import { Prisma } from '@prisma/client'
import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { updateItemPricingData } from '../../_actions/pricing/updateItemPricingData'
import { createItemPricingData } from '../../_actions/pricing/createItemPricingData'
import { useItemSelection } from '@/store/itemSlice'
import { useRouter } from 'next/navigation'

type Inputs = {
  arrivalCost: number
  productionUsageCost: number
  auxiliaryUsageCost: number
  unforeseenDifficultiesCost: number
  isUpcomingPriceActive: boolean
  upcomingPrice: number
  upcomingPriceUomId: string
}
const FormMode = ({
  setMode
}: {
  setMode: Dispatch<SetStateAction<'edit' | 'view'>>
}) => {

  const { pricingData: pricing, item, options } = useItemSelection()
  const uom = options.uom

  const defaults: Inputs = pricing ? { arrivalCost: pricing.arrivalCost, productionUsageCost: pricing.productionUsageCost, auxiliaryUsageCost: pricing.auxiliaryUsageCost, unforeseenDifficultiesCost: pricing.unforeseenDifficultiesCost, isUpcomingPriceActive: pricing.isUpcomingPriceActive, upcomingPrice: pricing.upcomingPrice, upcomingPriceUomId: pricing.upcomingPriceUomId } : { arrivalCost: 0, productionUsageCost: 0, auxiliaryUsageCost: 0, unforeseenDifficultiesCost: 0, isUpcomingPriceActive: false, upcomingPrice: 0, upcomingPriceUomId: staticRecords.inventory.uom.lb }

  const form = useForm<Inputs>({ defaultValues: defaults })
  const router = useRouter()

  const uomOptions = uom.map((u) => ({
    label: `${TextUtils.properCase(u.name)} (${u.abbreviation})`,
    value: u.id,
  }))

  const handleSubmit = (data: Inputs) => {

    if (!pricing) {
      handleCreate(data);
      return;
    }

    handleUpdate(data);

  }

  const handleUpdate = async (data: Inputs) => {

    if (!pricing) {
      return;
    }
    const payload: Prisma.ItemPricingDataUncheckedUpdateInput = {
      ...data,
    }

    await updateItemPricingData(pricing.id, payload)

    setMode('view')
    router.refresh()

  }

  const handleCreate = async (data: Inputs) => {
    if (!item) return;

    const payload: Prisma.ItemPricingDataUncheckedCreateInput = {
      itemId: item.id,
      ...data
    }

    await createItemPricingData(payload);

    setMode('view')
    router.refresh()
  }

  return (
    <Form.Root onSubmit={handleSubmit} form={form}>

      <Form.Number
        form={form}
        fieldName='arrivalCost'
        label='Arrival Cost'
        required
      />

      <Form.Number
        form={form}
        fieldName='productionUsageCost'
        label='Production Usage Cost'
        required
      />

      <Form.Number
        form={form}
        fieldName='auxiliaryUsageCost'
        label='Auxiliary Usage Cost'
        required
      />

      <Form.Number
        form={form}
        fieldName='unforeseenDifficultiesCost'
        label='Unforeseen Difficulties Cost'
        required
      />

      <Form.Number
        form={form}
        fieldName='upcomingPrice'
        label='Upcoming Price'
        required
      />

      <Form.Select
        form={form}
        fieldName='upcomingPriceUomId'
        label='Upcoming Price Uom ($/UOM)'
        options={uomOptions}
      />

      <Form.Toggle
        form={form}
        fieldName='isUpcomingPriceActive'
        label='Is Upcoming Price Active'
      />

      <Form.ActionRow form={form} />



    </Form.Root>
  )
}

export default FormMode
