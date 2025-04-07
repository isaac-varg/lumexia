import { ItemPricingData } from '@/actions/accounting/pricing/getItemPricingData'
import { Uom } from '@/actions/inventory/getAllUom'
import Form from '@/components/Form'
import { staticRecords } from '@/configs/staticRecords'
import { TextUtils } from '@/utils/text'
import { Prisma } from '@prisma/client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createItemPricingData } from '../../_functions/createItemPricingData'

type Inputs = {
    arrivalCost: number
    productionUsageCost: number
    unforeseenDifficultiesCost: number
    isUpcomingPriceActive: boolean
    upcomingPrice: number
    upcomingPriceUomId: string
}
const FormMode = ({
    pricing,
    itemId,
    uom,
}: {
    pricing: ItemPricingData
    itemId: string
    uom: Uom[]
}) => {

    const defaults: Inputs = pricing ? { arrivalCost: pricing.arrivalCost, productionUsageCost: pricing.productionUsageCost, unforeseenDifficultiesCost: pricing.unforeseenDifficultiesCost, isUpcomingPriceActive: pricing.isUpcomingPriceActive, upcomingPrice: pricing.upcomingPrice, upcomingPriceUomId: pricing.upcomingPriceUomId } : { arrivalCost: 0, productionUsageCost: 0, unforeseenDifficultiesCost: 0, isUpcomingPriceActive: false, upcomingPrice: 0, upcomingPriceUomId: staticRecords.inventory.uom.lb }

    const form = useForm<Inputs>({ defaultValues: defaults })

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
        const payload: 

    }

    const handleCreate = async (data: Inputs) => {

        const payload: Prisma.ItemPricingDataUncheckedCreateInput = {
            itemId,
            ...data
        }

        await createItemPricingData(payload);

        location.reload()
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
