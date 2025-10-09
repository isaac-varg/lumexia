'use client'
import { ItemType } from "@/actions/inventory/itemTypes/getAll"
import Card from "@/components/Card"
import { useAppForm } from "@/components/Form2"
import SectionTitle from "@/components/Text/SectionTitle"
import { updateItemTypes } from "../_actions/updateItemTypes"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { TbPlus } from "react-icons/tb"
import ItemTypesForm from "./ItemTypesForm"

const ItemTypes = ({ itemTypes }: { itemTypes: ItemType[] }) => {


  const [isAdd, setIsAdd] = useState(false);
  const form = useAppForm({
    defaultValues: {
      itemTypes,
    },
    onSubmit: async ({ value }) => {
      console.log('make sure not running')
      await updateItemTypes(value.itemTypes);
      location.reload()
      form.reset()

    }
  })
  return (
    <div className="flex flex-col gap-4 col-span-3">
      <div className="flex justify-between items-center">
        <SectionTitle>Item Types</SectionTitle>

        <button onClick={() => setIsAdd(true)} className="btn btn-secondary"><TbPlus className="size-4" /> </button>

      </div>

      <Card.Root>
        <p className="font-poppins text-xl text-base-content">Collections that allow for items to be grouped and managed.</p>

        {isAdd && <ItemTypesForm setIsAdd={setIsAdd} />}

        {!isAdd && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex flex-col gap-4"
          >
            <form.AppField name="itemTypes" mode="array">
              {(field) => {
                return (
                  <div className="flex flex-col gap-4">
                    {field.state.value.map((_, i) => {
                      return (
                        <div
                          key={`itemTypes[${i}].id`}
                          className="flex flex-col gap-1">
                          <label className="font-medium text-xl text-base-content">{_.name}</label>
                          <div className='grid grid-cols-2 gap-2'>
                            <form.AppField
                              name={`itemTypes[${i}].name`} >
                              {(subField) => (
                                <subField.TextField label={'Name'} labelClass="soft" />
                              )}
                            </form.AppField>
                            <form.AppField
                              key={`itemTypes[${i}].id`}
                              name={`itemTypes[${i}].config.isPricingExaminationTriggerEnabled`} >
                              {(subField) => (
                                <subField.ToggleField label={'Triggers Pricing Exam'} labelClass="soft" />
                              )}
                            </form.AppField>
                          </div>
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

      </Card.Root>

    </div>


  )
}

export default ItemTypes
