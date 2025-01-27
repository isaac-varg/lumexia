'use client'

import Dialog from "@/components/Dialog"
import { LinkedPos } from "../_functions/getLinkedPos"
import Form from "@/components/Form"
import { useForm } from "react-hook-form"
import { Containers } from "../_functions/getContainerTypes"
import { restructureData } from "@/utils/data/restructureData"
import { SelectOption } from "@/types/selectOption"
import { useState } from "react"
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { Prisma } from "@prisma/client"
import { createPoItemDetails } from "../_functions/createPoItemDetail"
import { staticRecords } from "@/configs/staticRecords"
import { DateTime } from "luxon"
import { updatePoItemDetails } from "../_functions/updatePoItemDetails"

type LinkedPoDialogProps = {
    containerTypes: Containers[]
    purchaseOrder: LinkedPos
}

type Inputs = {
    weightPerContainer: number
    containerTypeId: string
    quantityOfContainers: number
}

const restructureAs = [
    { key: "id", rename: "value" },
    { key: "name", rename: "label" },
];

const LinkedPoDialog = ({ purchaseOrder, containerTypes }: LinkedPoDialogProps) => {

    const isNewDetailsEntry = purchaseOrder.po.purchaseOrderItems[0].details.length === 0
    const detailId = purchaseOrder.po.purchaseOrderItems[0].details[0].id;
    const expectedDateStart = isNewDetailsEntry ? null : purchaseOrder.po.purchaseOrderItems[0].details[0].expectedDateStart
    const expectedDateEnd = isNewDetailsEntry ? null : purchaseOrder.po.purchaseOrderItems[0].details[0].expectedDateEnd


    const form = useForm<Inputs>()
    const [expectedDate, setExpectedDate] = useState({
        startDate: expectedDateStart,
        endDate: expectedDateEnd,
    })
    const [isDateActive, setIsDateActive] = useState(false);


    const dateString = expectedDate.startDate && expectedDate.endDate ? `${DateTime.fromJSDate(expectedDate.startDate).toFormat('MMM DD YYYY') || ''} to ${DateTime.fromJSDate(expectedDate.endDate).toFormat('MMM DD YYYY')}` : 'None Set'


    const containerTypeOptions = restructureData(containerTypes, restructureAs) as SelectOption[]

    const handleSubmit = async (data: Inputs) => {



        if (isNewDetailsEntry) {
            const payload: Prisma.PurchaseOrderItemDetailUncheckedCreateInput = {
                weightUomId: staticRecords.inventory.uom.lb,
                poItemId: purchaseOrder.po.purchaseOrderItems[0].id,
                containerTypeId: data.containerTypeId,
                weightPerContainer: data.weightPerContainer,
                quantityOfContainers: data.quantityOfContainers,
                expectedDateStart: expectedDate.startDate,
                expectedDateEnd: expectedDate.endDate,
            }

            await createPoItemDetails(payload);

            return;
        }

        const payload: Prisma.PurchaseOrderItemDetailUncheckedUpdateInput = {
            containerTypeId: data.containerTypeId,
            weightPerContainer: data.weightPerContainer,
            quantityOfContainers: data.quantityOfContainers,
        }

        await updatePoItemDetails(detailId, payload)


    }

    const handleDateSelection = async (value: DateValueType | null) => {
        if (!value) { return }

        setExpectedDate(value)


        const { startDate, endDate } = value;

        await updatePoItemDetails(detailId, { expectedDateStart: startDate, expectedDateEnd: endDate })
        setIsDateActive(false)


    }

    return (
        <Dialog.Root identifier={`linkedPoDialog-${purchaseOrder.po.purchaseOrderItems[0].id}`}>
            <Dialog.Title>Purchase Order Item Details</Dialog.Title>
            <p>You can specify pack sizes for the order item and expected delivery date range</p>



            <Form.Root form={form} onSubmit={(data) => handleSubmit(data)}>


                <label className="font-poppins text-neutral-950 text-xl">Expected Delivery Date</label>
                <div
                    className="px-4 py-4 border-2 border-cutty-sark-100 bg-cutty-sark-100 rounded-lg focus:outline-none focus:ring-0 focus:border-cutty-sark-500 text-xl text-neutral-950"
                    onClick={() => setIsDateActive(true)}
                >

                    {isDateActive ? <Datepicker
                        separator='to'
                        value={expectedDate}
                        onChange={newValue => handleDateSelection(newValue)}
                    /> : dateString}

                </div>

                <Form.Number form={form} label="Weight per Container" fieldName="weightPerContainer" required />

                <Form.Select form={form} label="Container Type" fieldName="containerTypeId" options={containerTypeOptions} />

                <Form.Number form={form} label="Quantity of Containers" fieldName="quantityOfContainers" required />

                <button className="btn" type="submit">Save</button>

            </Form.Root>

        </Dialog.Root>
    )
}

export default LinkedPoDialog
