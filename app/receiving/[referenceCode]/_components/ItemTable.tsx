'use client'
import { PurchaseOrderItem } from "@/actions/purchasing/purchaseOrders/items/getAll"
import DataTable from "@/components/DataTable"
import { Fragment, useCallback, useMemo, useState } from "react"
import { getItemColumns } from "./ItemColumns"
import SectionTitle from "@/components/Text/SectionTitle"
import Card from "@/components/Card"
import { useAppForm } from "@/components/Form2"
import { receiveItems } from "../_actions/receiveItems"
import { purchaseOrderStatuses } from "@/configs/staticRecords/purchaseOrderStatuses"
import { useRouter } from "next/navigation"
import Alert from "@/components/Alert"
import useDialog from "@/hooks/useDialog"

type Props = {
  items: PurchaseOrderItem[]
}

const ItemTable = ({ items }: Props) => {
  const [selectedItems, setSelectedItems] = useState<PurchaseOrderItem[]>([])
  const [isPartial, setIsPartial] = useState<boolean>(false);
  const router = useRouter()
  const { showDialog, resetDialogContext } = useDialog()
  const [error, setError] = useState<string>('')
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
    let responses;
    if (selectedItems.length === receivableItems.length) {
      responses = await receiveItems(selectedItems, true);
    } else {
      responses = await receiveItems(selectedItems);
    }

    responses.forEach(res => {
      if (res.success === false) {
        if (!res.error) {
          console.log('Unknown error');
          return;
        }

        const errorString = `
${res.item.item.name}:  
${res.error.message}
`

        setError(errorString);
        showDialog('conversionError');
      }

    });

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

  const handleConversionErrorClick = (item: PurchaseOrderItem) => {
    router.push(`/inventory/discrete-conversion?itemId=${item.item.id}&supplierId=${item.purchaseOrders.supplierId}&purchasedUomId=${item.uomId}`)
  };

  const itemColumns = useMemo(() => getItemColumns({
    onConversionErrorClick: handleConversionErrorClick
  }), [handleConversionErrorClick]);

  const form = useAppForm({
    defaultValues: {
      partials: formPartialValues,
    },
    onSubmit: async ({ value }) => {
      const values = value.partials;

      const partialQuantities = new Map(values.map(v => [v.purchaseOrderItemId, v.quantity]))
      const responses = await receiveItems(selectedItems, false, partialQuantities);
      responses.forEach(res => {
        if (res.success === false) {
          if (!res.error) {
            console.log('Unknown error');
            return;
          }
          const errorString = `${res.error.message}: ${res.item.item.name}`

          setError(errorString);
          showDialog('conversionError');

        }
      });
      setIsPartial(false)
      router.refresh()

    }
  })

  return (
    <div className="flex flex-col gap-4">

      <Alert.Root identifier={`conversionError`}>

        <Alert.Content
          title="Error Receiving"
          actionLabel="Ok"
          actionColor="error"
          action={() => console.log('cleared')}
          cancelAction={() => { }}
        >
          {error}
        </Alert.Content>
      </Alert.Root>


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
