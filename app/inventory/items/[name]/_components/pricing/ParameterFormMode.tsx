import { TextUtils } from '@/utils/text'
import { Prisma } from '@prisma/client'
import React, { Dispatch, SetStateAction } from 'react'
import { updateItemPricingData } from '../../_actions/pricing/updateItemPricingData'
import { createItemPricingData } from '../../_actions/pricing/createItemPricingData'
import { useItemActions, useItemSelection } from '@/store/itemSlice'
import { useRouter } from 'next/navigation'
import { uom as staticUOM } from "@/configs/staticRecords/unitsOfMeasurement"
import { useAppForm } from '@/components/Form2'
import { z } from "zod"

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
  const { setCurrentTab } = useItemActions()

  const defaults: Inputs = pricing ? { arrivalCost: pricing.arrivalCost, productionUsageCost: pricing.productionUsageCost, auxiliaryUsageCost: pricing.auxiliaryUsageCost, unforeseenDifficultiesCost: pricing.unforeseenDifficultiesCost, isUpcomingPriceActive: pricing.isUpcomingPriceActive, upcomingPrice: pricing.upcomingPrice, upcomingPriceUomId: pricing.upcomingPriceUomId } : { arrivalCost: 0, productionUsageCost: 0, auxiliaryUsageCost: 0, unforeseenDifficultiesCost: 0, isUpcomingPriceActive: false, upcomingPrice: 0, upcomingPriceUomId: staticUOM.pounds }

  const form = useAppForm({
    defaultValues: defaults,
    onSubmit: async ({ value }) => {
      if (!pricing) {
        handleCreate(value);
        return;
      }
      handleUpdate(value);
    }
  })
  const router = useRouter()

  const uomOptions = uom.map((u) => ({
    label: `${TextUtils.properCase(u.name)} (${u.abbreviation})`,
    value: u.id,
  }))


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
    setCurrentTab('pricing')


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
    setCurrentTab('pricing')
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4"
    >

      <form.AppField
        name="arrivalCost"
        validators={{
          onChange: z.coerce.number().nonnegative()
        }}
      >
        {(field) => <field.NumberField label="Arrival Cost ($/lb)" />}
      </form.AppField>

      <form.AppField
        name="productionUsageCost"
        validators={{
          onChange: z.coerce.number().nonnegative()
        }}
      >
        {(field) => <field.NumberField label="Production Usage Cost ($/lb)" />}
      </form.AppField>

      <form.AppField
        name="auxiliaryUsageCost"
        validators={{
          onChange: z.coerce.number().nonnegative()
        }}
      >
        {(field) => <field.NumberField label="Auxiliary Usage Cost ($/lb)" />}
      </form.AppField>

      <form.AppField
        name="unforeseenDifficultiesCost"
        validators={{
          onChange: z.coerce.number().nonnegative()
        }}
      >
        {(field) => <field.NumberField label="Unforeseen Difficulties Cost ($/lb)" />}
      </form.AppField>


      <form.AppField
        name="upcomingPrice"
        validators={{
          onChange: z.coerce.number().nonnegative()
        }}
      >
        {(field) => <field.NumberField label="Upcoming Price ($/unit)" />}
      </form.AppField>

      <form.AppField
        name="upcomingPriceUomId"
        validators={{
          onChange: z.string()
        }}
      >
        {(field) => <field.SelectField label="Upcoming Price UOM" options={uomOptions} labelClass='soft' />}
      </form.AppField>

      <form.AppField
        name="isUpcomingPriceActive"
      >
        {(field) => <field.ToggleField label="Is Upcomming Price Active ($/lb)" />}
      </form.AppField>


      <div>
        <form.AppForm>
          <form.SubmitButton />
        </form.AppForm>

        <button className="btn btn-error btn-soft" onClick={() => {
          form.reset();
          setMode('view');
        }}>Cancel</button>
      </div>

    </form>

  )
}

export default FormMode
