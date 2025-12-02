'use client'

import { Uom } from "@/actions/inventory/getAllUom"
import { SingleItem } from "@/actions/inventory/getOneItem"
import Card from "@/components/Card"
import { useAppForm } from "@/components/Form2"
import { Supplier } from "@prisma/client"
import { useStore } from "@tanstack/react-form"
import { useRouter } from "next/navigation"
import { createDiscreteConversion } from "../_actions/createConversion"

const ConversionForm = ({ inventoryUom, supplierUom, item, supplier }: { inventoryUom: Uom, supplierUom: Uom, item: SingleItem, supplier: Supplier }) => {

  const router = useRouter()
  const form = useAppForm({
    defaultValues: {
      inventoryUomQuantity: 0,
    },
    onSubmit: async ({ value }) => {
      createDiscreteConversion(inventoryUom.id, supplierUom.id, value.inventoryUomQuantity, supplier.id, item.id);
      router.back()
      router.refresh();
    }
  })

  const { inventoryUomQuantity } = useStore(form.store, (state: any) => state.values);

  return (
    <div>

      <Card.Root>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-8"
        >


          <div className="flex flex-col gap-4">
            <div className="text-3xl font-medium font-poppins justify-between flex">
              <span className="text-base-content/50">Item</span>
              <span className="text-primary/70 capitalize">{`${item.name}`}</span>
            </div>
            <div className="text-3xl font-medium font-poppins justify-between flex">
              <span className="text-base-content/50">Purchased From</span>
              <span className="text-secondary/70 capitalize">{`${supplier.name}`}</span>
            </div>


          </div>

          <div className="flex gap-6 items-center justify-center">

            <label className="text-accent font-semibold text-4xl">{`1 ${supplierUom.name}`}</label>
            <label className="font-semibold text-base-content text-5xl">=</label>
            <label className="text-accent font-semibold text-4xl">{`${inventoryUomQuantity} ${inventoryUom.name}`}</label>

          </div>


          <form.AppField
            name="inventoryUomQuantity"
          >
            {(field) => <field.NumberField labelClass="soft" label='' />}
          </form.AppField>


          <div>
            <form.AppForm>
              <form.SubmitButton />
            </form.AppForm>
          </div>

        </form>
      </Card.Root>
    </div>
  )
}

export default ConversionForm
