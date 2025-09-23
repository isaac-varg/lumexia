import { useAppForm } from "@/components/Form2";
import { useQcExaminationSelection } from "@/store/qcExaminationSlice";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { handleResultSubmission } from "../../../_actions/handleResultSubmission";

const ParameterForm = () => {


  const router = useRouter()
  const { selectedItemParameter, qcRecord } = useQcExaminationSelection()

  const dynamicDefaultValues = useMemo(() => {
    const definitions = selectedItemParameter?.parameter.inputDefinitions;
    if (!definitions || !Array.isArray(definitions)) {
      return {};
    }
    return definitions.reduce((acc, definition) => {
      // Use a unique property from your definition object as the key
      acc[definition.id] = definition.
      return acc;
    }, {} as Record<string, any>);
  }, [selectedItemParameter]);

  const form = useAppForm({
    defaultValues: {
      value: '',
      ...dynamicDefaultValues,
    },
    onSubmit: async ({ value }) => {
      if (!qcRecord) return;
      handleResultSubmission(qcRecord.id, value)
      router.refresh()
    }
  })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >

        <form.AppField
          name="value"
          children={(field) => <field.TextField label={`${selectedItemParameter?.parameter.name} (${selectedItemParameter?.parameter.uom})`} />}
        />

        {selectedItemParameter && selectedItemParameter.parameter.inputDefinitions.map((definition) => (
          <form.AppField
            key={definition.id}
            name={definition.id as any}
            children={(field) => (
              <field.TextField label={`${definition.name} (${definition.unit || ''})`} />
            )}
          />
        ))}

        <div>
          <form.AppForm>
            <form.SubmitButton />
          </form.AppForm>
        </div>
      </form>

    </div>
  )
}

export default ParameterForm
