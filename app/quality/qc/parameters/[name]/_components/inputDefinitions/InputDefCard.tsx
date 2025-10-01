import { qualityActions } from "@/actions/quality";
import { ParameterInputDefinition } from "@/actions/quality/qc/inputDefinitions/getAll"
import { useAppForm } from "@/components/Form2"
import { useQcParameterSelection } from "@/store/qcParametersSlice";
import { useRouter } from "next/navigation";
import { TbTrash } from "react-icons/tb";

const InputDefCard = ({ inputDefinition }: { inputDefinition: ParameterInputDefinition }) => {

  const { name, label, dataTypeId, required, unit } = inputDefinition;
  const { dataTypes } = useQcParameterSelection()
  const router = useRouter()

  const defaultValues = {
    name,
    label,
    dataTypeId,
    required,
    unit
  }

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await qualityActions.qc.inputDefinitions.update(inputDefinition.id, value)
      form.reset()
      router.refresh()
    }
  })

  const handleDelete = async () => {
    await qualityActions.qc.inputDefinitions.delete(inputDefinition.id)
    router.refresh()
  }

  return (
    <div
      className="p-4 bg-base-300/75 rounded-xl"
    >
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
          name="label"
        >
          {(field) => <field.TextField label="Label" />}
        </form.AppField>

        <form.AppField
          name="required"
        >
          {(field) => <field.ToggleField label="Required" />}
        </form.AppField>

        <form.AppField
          name="dataTypeId"
        >
          {(field) => (
            <field.SelectField
              label="Data Type"
              options={dataTypes.map(dt => ({ label: dt.name, value: dt.id }))}
            />

          )}
        </form.AppField>

        <form.AppField
          name="unit"
        >
          {(field) => <field.TextField label="Unit of Measurement" />}
        </form.AppField>

        <div className="flex items-center justify-between">
          <form.AppForm>
            <form.SubmitButton />

          </form.AppForm>

          <button className="btn btn-error btn-outline" onClick={(e) => {
            e.preventDefault()
            handleDelete()
          }}> <TbTrash className="size-4" /> </button>
        </div>

      </form>

    </div>
  )
}

export default InputDefCard
