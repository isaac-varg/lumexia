'use client'
import { ItemType } from "@/actions/inventory/itemTypes/getAll"
import Card from "@/components/Card"
import { useAppForm } from "@/components/Form2"
import SectionTitle from "@/components/Text/SectionTitle"

const ItemTypes = ({ itemTypes }: { itemTypes: ItemType[] }) => {


  const form = useAppForm({
    defaultValues: {
      itemTypes,
    },
    onSubmit: ({ value }) => {
      console.log(value)
    }
  })
  return (
    <div className="flex flex-col gap-4 col-span-2">
      <SectionTitle>Item Types</SectionTitle>

      <Card.Root>
        <p className="font-poppins text-xl text-base-content">Collections that allow for items to be grouped and managed.</p>

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
                      <form.AppField
                        key={`itemTypes[${i}].id`}
                        name={`itemTypes[${i}].name`} >
                        {(subField) => <subField.TextField label={_.name} />}
                      </form.AppField>

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

export default ItemTypes
