import Card from "@/components/Card"
import { useAppForm } from "@/components/Form2"
import SectionTitle from "@/components/Text/SectionTitle"
import { usePurchasingActions, usePurchasingSelection } from "@/store/purchasingSlice"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"
import { AppFieldExtendedReactFormApi, FormApi, useStore } from "@tanstack/react-form"
import { useMemo } from "react"

const LineItemRow = ({ form, index, options, itemName }: {
  form: any,
  index: any,
  options: any,
  itemName: any
}) => {
  const { quantity, pricePerUnit } = useStore(form.store, (state) => state.values.items[index]);
  const total = toFracitonalDigits.curreny(quantity * pricePerUnit);

  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-xl text-base-content">{itemName}</label>
      <div className='grid grid-cols-4 gap-2'>
        <form.AppField
          name={`items[${index}].quantity`} >
          {(subField) => (
            <subField.NumberField label={'Quantity'} labelClass="soft" />
          )}
        </form.AppField>
        <form.AppField
          name={`items[${index}].pricePerUnit`} >
          {(subField) => (
            <subField.NumberField label={'Price Per Unit'} labelClass="soft" />
          )}
        </form.AppField>
        <form.AppField
          name={`items[${index}].uomId`} >
          {(subField) => (
            <subField.SelectField label={'UOM'} labelClass="soft" options={options.uoms.map(u => ({ label: u.name, value: u.id }))} />
          )}
        </form.AppField>
        <div>
          <p>{total}</p>
        </div>
      </div>
    </div>
  )
}

const EditMode = () => {
  const { orderItems, options } = usePurchasingSelection()
  const { setLineItemsMode } = usePurchasingActions()

  const defaultValues = useMemo(() => {
    return orderItems.map(i => ({
      id: i.id,
      uomId: i.uomId,
      itemName: i.item.name,
      quantity: i.quantity,
      pricePerUnit: i.pricePerUnit
    }))

  }, [orderItems])

  const form = useAppForm({
    defaultValues: {
      items: defaultValues
    },
    onSubmit: ({ value }) => {
      console.log(value)
      setLineItemsMode('view')
    }
  });


  return (
    <div className="flex flex-col gap-6">
      <SectionTitle>User Roles</SectionTitle>

      <Card.Root>

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
                  {field.state.value.map((item, i) => {
                    return (
                      <LineItemRow
                        key={item.id}
                        form={form}
                        index={i}
                        options={options}
                        itemName={item.itemName}
                      />
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


      </Card.Root>

    </div>
  )
}



export default EditMode
