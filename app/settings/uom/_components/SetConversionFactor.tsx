'use client'

import { Uom } from "@/actions/inventory/getAllUom"
import Dialog from "@/components/Dialog"
import { ItemWithGenericUnits } from "../_functions/getItemsWithUnits"
import { useForm } from "react-hook-form"
import Form from "@/components/Form"
import { staticRecords } from "@/configs/staticRecords"
import { inventoryActions } from "@/actions/inventory"
import useDialog from "@/hooks/useDialog"

type Inputs = {
    convertToUomId: string
    conversionFactor: number
}

const SetConversionFactor = ({ uoms, selectedItem }: { uoms: Uom[], selectedItem: ItemWithGenericUnits | null }) => {

    const form = useForm()
    const dialog = useDialog()

    // lol
    const uomWithoutUnits = uoms.filter(u => u.id !== staticRecords.inventory.uom.units)

    const selectOptions = uomWithoutUnits.map((u) => ({
        label: u.name,
        value: u.id,
    }))

    const handleSubmit = async (data: Inputs) => {

        if (!selectedItem) return

        const payload = {
            itemId: selectedItem.id,
            supplierId: selectedItem.purchaseOrderItem[0].purchaseOrders.supplierId,
            convertToUomId: data.convertToUomId,
            conversionFactor: data.conversionFactor,
        };

        await inventoryActions.genericUnitsConversion.create(payload)
        dialog.resetDialogContext()
        location.reload()

    }

    if (!selectedItem) return false
    return (
        <Dialog.Root identifier="setUnitConversionFactor">

            <Dialog.Title>Set Unit Conversion Factor</Dialog.Title>

            <p className="font-poppins text-xl mb-8">

                This form is to set the conversion factor when purchasing the <span className="font-semibold text-emerald-700">{selectedItem.name}</span> item in <span className="italic text-lilac-600">generic units</span> from specifically <span className="font-semibold text-rose-400">{selectedItem.purchaseOrderItem[0].purchaseOrders.supplier.name}</span>
            </p>


            <Form.Root form={form} onSubmit={handleSubmit}>


                <Form.Select
                    form={form}
                    fieldName="convertToUomId"
                    label="Convert to UOM"
                    options={selectOptions}
                />

                <Form.Number
                    form={form}
                    fieldName="conversionFactor"
                    label="Conversion Factor"
                    required
                />

                <Form.ActionRow form={form} />
            </Form.Root>



        </Dialog.Root>
    )
}

export default SetConversionFactor
