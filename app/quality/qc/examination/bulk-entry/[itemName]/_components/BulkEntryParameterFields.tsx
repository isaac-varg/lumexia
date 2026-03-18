'use client'
import { useStore } from "@tanstack/react-form"

type Props = {
  form: any
  rowIndex: number
  paramIndex: number
}

const BulkEntryParameterFields = ({ form, rowIndex, paramIndex }: Props) => {
  const parameterResult = useStore(
    form.store,
    (state: any) => state.values.rows[rowIndex]?.parameterResults[paramIndex]
  )

  if (!parameterResult) return null

  return (
    <div className="flex flex-col gap-3 border border-base-300 rounded-lg p-3">
      <form.AppField name={`rows[${rowIndex}].parameterResults[${paramIndex}].value`}>
        {(field: any) => (
          <field.TextField label={`${parameterResult.parameterName}`} />
        )}
      </form.AppField>

      <form.AppField name={`rows[${rowIndex}].parameterResults[${paramIndex}].inputDefinitions`} mode="array">
        {(field: any) => (
          <div className="flex flex-col gap-2">
            {field.state.value.map((_: any, di: number) => (
              <form.AppField
                key={`rows[${rowIndex}].parameterResults[${paramIndex}].inputDefinitions[${di}].value`}
                name={`rows[${rowIndex}].parameterResults[${paramIndex}].inputDefinitions[${di}].value`}
              >
                {(subField: any) => (
                  <subField.TextField
                    label={`${parameterResult.inputDefinitions[di]?.name}${parameterResult.inputDefinitions[di]?.unit ? ` (${parameterResult.inputDefinitions[di].unit})` : ''}`}
                    labelClass="soft"
                  />
                )}
              </form.AppField>
            ))}
          </div>
        )}
      </form.AppField>
    </div>
  )
}

export default BulkEntryParameterFields
