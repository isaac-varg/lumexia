'use client'
import { PurchaseOrderItem } from "@/actions/purchasing/purchaseOrders/items/getAll"
import DataTable from "@/components/DataTable"
import { Fragment, useCallback, useMemo, useState } from "react"
import { itemColumns } from "./ItemColumns"
import SectionTitle from "@/components/Text/SectionTitle"
import Card from "@/components/Card"
import { useAppForm } from "@/components/Form2"
import { receiveItems } from "../_actions/receiveItems"
import { purchaseOrderStatuses } from "@/configs/staticRecords/purchaseOrderStatuses"
import { useRouter } from "next/navigation"

type Props = {
  items: PurchaseOrderItem[]
}

const ItemTable = ({ items }: Props) => {
  const [selectedItems, setSelectedItems] = useState<PurchaseOrderItem[]>([])
  const [isPartial, setIsPartial] = useState<boolean>(false);
  const router = useRouter()
  const receivableItems = useMemo(() => {
    return items.filter(i => (i.purchaseOrderStatusId === purchaseOrderStatuses.confirmedAwaitingDelivery || i.purchaseOrderStatusId === purchaseOrderStatuses.partiallyReceived))
  }, [items])

  const formPartialValues = useMemo(() => {
    return selectedItems.map(i => ({
      purchaseOrderItemId: i.id,
      itemName: i.item.name,
      quantity: i.quantity,
      uomAbbreviation: i.uom.abbreviation,
    }));
  }, [isPartial, selectedItems])

  const handleReceiveSelected = async () => {
    if (selectedItems.length === receivableItems.length) {
      await receiveItems(selectedItems, true);
      router.refresh()
      return;
    }
    await receiveItems(selectedItems);
    router.refresh()

  }

  const handlePartialClick = () => {
    setIsPartial(true);
  }

  const handleSelectionChange = useCallback((data: PurchaseOrderItem[]) => {
    setSelectedItems(data)
  }, [])

  const handleCancel = () => {
    setIsPartial(false)
  }

  const form = useAppForm({
    defaultValues: {
      partials: formPartialValues,
    },
    onSubmit: async ({ value }) => {
      const values = value.partials;

      const partialQuantities = new Map(values.map(v => [v.purchaseOrderItemId, v.quantity]))
      await receiveItems(selectedItems, false, partialQuantities);
      setIsPartial(false)
      router.refresh()

    }
  })

  return (
    <div className="flex flex-col gap-4">

      <div className="flex justify-between">
        <SectionTitle>Receivables</SectionTitle>
      </div>

      <div className="flex gap-2">
        {!isPartial && (
          <Fragment>
            <button
              onClick={handlePartialClick}
              className={`btn ${selectedItems.length === 0 ? "btn-disabled" : 'btn-warning'}`}>
              Partially Receive
            </button>

            <button
              onClick={handleReceiveSelected}
              className={`btn ${selectedItems.length === 0 ? "btn-disabled" : 'btn-success'}`}>
              Fully Receive
            </button>
          </Fragment>
        )}

        {isPartial && (
          <button
            onClick={handleCancel}
            className="btn btn-error">
            Cancel
          </button>
        )}
      </div>

      <Card.Root>
        {isPartial && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex flex-col gap-4"
          >



            <form.AppField name="partials" mode="array">
              {(field) => {
                return (
                  <div className="flex flex-col gap-4">
                    {field.state.value.map((_, i) => {
                      return (
                        <div
                          key={`partials[${i}].purchaseOrderItemId`}
                          className="flex flex-col gap-2"
                        >

                          <label className="font-medium text-xl text-base-content">{_.itemName}</label>

                          <form.AppField
                            name={`partials[${i}].quantity`} >
                            {(subField) => <subField.NumberField labelClass="soft" label={`Quantity (${_.uomAbbreviation})`} />}
                          </form.AppField>
                        </div>
                      )
                    })}
                  </div>
                )
              }}

            </form.AppField>


            <div>
              <form.AppForm>
                <form.SubmitButton />
              </form.AppForm>
            </div>


          </form>


        )}
        {!isPartial && (
          <DataTable.Selectable<PurchaseOrderItem>
            data={receivableItems}
            columns={itemColumns}
            onSelectionChange={handleSelectionChange}
          />
        )}
      </Card.Root>
    </div>
  )
}


export default ItemTable
