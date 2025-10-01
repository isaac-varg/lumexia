import { useAppForm } from "@/components/Form2"
import { useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { useMemo } from "react"
import { handleResultUpdate } from "../../../_actions/handleResultUpdate"
import { useRouter } from "next/navigation"
import { handleResultSubmission } from "../../../_actions/handleResultSubmission"

export type ParameterInput = {
  value: string,
  inputDefinitions: {
    id: string,
    value: string
    label: string
    resultId: string
  }[]
}

const ParameterInput = () => {
  const { selectedItemParameter, results, qcRecord } = useQcExaminationSelection()
  const router = useRouter()

  const defaultValues = useMemo(() => {
    const hasResults = results.has(selectedItemParameter?.id || '')
    const data = results.get(selectedItemParameter?.id || '')
    const inputDefinitionsData = selectedItemParameter?.parameter.inputDefinitions;
    const resultValue = hasResults ? (data ? data.value : '') : ''
    const definitionsValues = (!inputDefinitionsData || !Array.isArray(inputDefinitionsData)) ? [] : (
      inputDefinitionsData.map(def => {

        const value = hasResults ? data?.parameterInputResults.find(res => res.parameterInputDefinitionId === def.id)?.value || '' : ''
        const resultId = hasResults ? data?.parameterInputResults.find(res => res.parameterInputDefinitionId === def.id)?.id || '' : ''


        return ({
          id: def.id,
          value: value,
          label: `${def.name} (${def.unit || ''})`,
          resultId,
        })
      })
    )


    return {
      value: resultValue,
      inputDefinitions: definitionsValues,
    }
  }, [selectedItemParameter, results])

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      if (!qcRecord || !selectedItemParameter) return;


      const hasResults = results.has(selectedItemParameter?.id || '')
      const data = results.get(selectedItemParameter?.id || '')
      const id = hasResults ? (data ? data.id : '') : ''

      if (hasResults) {
        handleResultUpdate(id, value as ParameterInput);
        router.refresh()
        form.reset()
        return;
      }
      handleResultSubmission(qcRecord.id, selectedItemParameter.parameterId, selectedItemParameter.id, value)
      router.refresh()
      form.reset()
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
        >
          {(field) => <field.TextField label={`${selectedItemParameter?.parameter.name} (${selectedItemParameter?.parameter.uom})`} />}
        </form.AppField>


        <form.AppField name="inputDefinitions" mode="array">
          {(field) => {
            return (
              <div className="flex flex-col gap-4">
                {field.state.value.map((_, i) => {
                  return (
                    <form.AppField
                      key={`inputDefinitions[${i}].id`}
                      name={`inputDefinitions[${i}].value`} >
                      {(subField) => <subField.TextField label={_.label} />}
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



    </div>
  )
}

export default ParameterInput
