import { PurchaseOrderItem } from "@/actions/purchasing/purchaseOrders/items/getAll"
import { useAppForm } from "@/components/Form2";
import { useMemo } from "react";

const LabelForm = ({ items, onComplete }: { items: PurchaseOrderItem[], onComplete: () => void; }) => {

  const defaults = useMemo(() => {
    return items.map(i => ({
      purcahseOrderItemId: i.id,
      itemName: i.item.name,
      labelQuantity: 1,
    }))
  }, [items])

  const form = useAppForm({
    defaultValues: {
      items: defaults,
    },
    onSubmit: ({ value }) => {
      console.log(value)
    }
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4"
    >



      <form.AppField name="items" mode="array">
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
                      name={`items[${i}].labelQuantity`} >
                      {(subField) => <subField.NumberField labelClass="soft" label={`Label To Print`} />}
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
          <form.SubmitButton isAlwaysSubmittable={true}>Print</form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  )
}

export default LabelForm
