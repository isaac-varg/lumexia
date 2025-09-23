import { useAppForm } from "@/components/Form2";
import { useQcExaminationSelection } from "@/store/qcExaminationSlice";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { handleResultSubmission } from "../../../_actions/handleResultSubmission";
import { ExaminationResults } from "../../../_actions/getResults";

const ParameterForm = () => {


  const router = useRouter()
  const { selectedItemParameter, qcRecord, results } = useQcExaminationSelection()
  const [result, setResult] = useState<ExaminationResults | null>(null)

  const dynamicDefaultValues = useMemo(() => {
    const definitions = selectedItemParameter?.parameter.inputDefinitions;
    if (!definitions || !Array.isArray(definitions)) {
      return {};
    }
    return definitions.reduce((acc, definition) => {
      const inputResult = result?.parameterInputResults.filter(res => res.parameterInputDefinitionId === definition.id)[0]

      acc[definition.id] = result ? inputResult?.value : ''
      return acc;
    }, {} as Record<string, any>);
  }, [selectedItemParameter]);

  const form = useAppForm({
    defaultValues: {
      value: result ? result.value : '',
      ...dynamicDefaultValues,
    },
    onSubmit: async ({ value }) => {
      if (!qcRecord || !selectedItemParameter) return;

      if (result) {
        console.log('Has Result skipping');
        return;
      }
      handleResultSubmission(qcRecord.id, selectedItemParameter.parameterId, selectedItemParameter.id, value)
      router.refresh()
    }
  })

  useEffect(() => {
    if (!selectedItemParameter) return;

    const data = results.get(selectedItemParameter.id);
    if (!data) {
      setResult(null)
      return;
    }
    setResult(data);

  }, [selectedItemParameter, results, setResult])

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
