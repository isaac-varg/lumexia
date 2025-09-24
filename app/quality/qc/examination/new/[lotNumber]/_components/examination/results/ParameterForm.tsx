import { useAppForm } from "@/components/Form2";
import { useQcExaminationSelection } from "@/store/qcExaminationSlice";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { handleResultSubmission } from "../../../_actions/handleResultSubmission";
import { ExaminationResults } from "../../../_actions/getResults";
import { handleResultUpdate } from "../../../_actions/handleResultUpdate";

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
      const inputResult = result?.parameterInputResults.find(res => res.parameterInputDefinitionId === definition.id)
      const key = (result && inputResult) ? `${definition.id}_${inputResult.id}` : definition.id;

      acc[key] = (result && inputResult) ? inputResult.value : ''
      return acc;
    }, {} as Record<string, any>);
  }, [selectedItemParameter, result, setResult]);

  const form = useAppForm({
    defaultValues: {
      value: result ? result.value : '',
      ...dynamicDefaultValues,
    },
    onSubmit: async ({ value }) => {
      if (!qcRecord || !selectedItemParameter) return;

      if (result) {
        handleResultUpdate(result.id, value);
        router.refresh()
        form.reset()
        return;
      }
      handleResultSubmission(qcRecord.id, selectedItemParameter.parameterId, selectedItemParameter.id, value)
      router.refresh()
      form.reset()
    }
  })

  useEffect(() => {
    if (!selectedItemParameter) return;

    const data = results.get(selectedItemParameter.id);
    setResult(data || null);

  }, [selectedItemParameter, results])

  useEffect(() => {
    form.reset({
      value: result ? result.value : '',
      ...dynamicDefaultValues,
    })
  }, [result, dynamicDefaultValues, form])

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

        {selectedItemParameter && selectedItemParameter.parameter.inputDefinitions.map((definition) => {
          const inputResult = result?.parameterInputResults.find(res => res.parameterInputDefinitionId === definition.id);
          const fieldName = (result && inputResult) ? `${definition.id}_${inputResult.id}` : definition.id;
          return (
            <form.AppField
              key={definition.id}
              name={fieldName as any}
              children={(field) => (
                <field.TextField label={`${definition.name} (${definition.unit || ''})`} />
              )}
            />
          )
        })}

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
