'use client'

import { qualityActions } from "@/actions/quality"
import Card from "@/components/Card"
import { useAppForm } from "@/components/Form2"
import SectionTitle from "@/components/Text/SectionTitle"
import { useQcParameterSelection } from "@/store/qcParametersSlice"
import { useRouter } from "next/navigation"

const Basics = () => {
  const { selectedParameter, dataTypes } = useQcParameterSelection()
  const router = useRouter()

  const defaultParameter = {
    name: selectedParameter?.name || '',
    description: selectedParameter?.description || '',
    isWetParameter: selectedParameter?.isWetParameter || false,
    dataTypeId: selectedParameter?.dataTypeId || '',
    uom: selectedParameter?.uom || ''
  }

  const form = useAppForm({
    defaultValues: defaultParameter,
    onSubmit: async ({ value }) => {
      if (!selectedParameter) {
        throw new Error("Cannot update without selected parameter");
      };
      await qualityActions.qc.parameters.update(selectedParameter.id, value);
      form.reset()
      router.refresh()
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
          >
            {(field) => <field.TextField label="Name" />}
          </form.AppField>

          <form.AppField
            name="description"
          >
            {(field) => <field.TextField label="Description" />}
          </form.AppField>

          <form.AppField
            name="isWetParameter"
          >
            {(field) => <field.ToggleField label="Is Wet Parameter" />}
          </form.AppField>

          <form.AppField
            name='dataTypeId'
          >
            {(field) => <field.SelectField label="Data Type" options={dataTypes.map(dt => ({ value: dt.id, label: dt.name }))} />}
          </form.AppField>

          <form.AppField
            name="uom"
          >
            {(field) => <field.TextField label="Unit of Measurement" />}
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

export default Basics
