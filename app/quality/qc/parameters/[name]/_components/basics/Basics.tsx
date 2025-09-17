'use client'

import Card from "@/components/Card"
import { useAppForm } from "@/components/Form2"
import SectionTitle from "@/components/Text/SectionTitle"
import { useQcParameterSelection } from "@/store/qcParametersSlice"

type ParameterFormInputs = {
  name: string
  description: string
  isWetParameter: boolean
}

const Basics = () => {
  const { selectedParameter } = useQcParameterSelection()

  const defaultParameter = {
    name: selectedParameter?.name || '',
    description: selectedParameter?.description || '',
    isWetParameter: selectedParameter?.isWetParameter || false,
  }

  const form = useAppForm({
    defaultValues: defaultParameter,
    onSubmit: ({ value }) => {
      console.log(value);
    }
  })


  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>Basics</SectionTitle>
      <Card.Root>


        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >

          <form.AppField
            name="name"
            children={(field) => <field.TextField label="Name" />}
          />

          <form.AppField
            name="description"
            children={(field) => <field.TextField label="Description" />}
          />

          <form.AppField
            name="isWetParameter"
            children={(field) => <field.ToggleField label="Is Wet Parameter" />}
          />

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

export default Basics
