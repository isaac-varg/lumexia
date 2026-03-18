'use client'
import { useAppForm } from "@/components/Form2"
import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll"
import { QcItemParameter } from "@/actions/quality/qc/parameters/getAllByItem"
import { Item } from "@/actions/inventory/items/getOne"
import { InventoryLot } from "@/actions/auxiliary/getLotsByItem"
import { bulkImportQcRecords } from "@/actions/quality/qc/records/bulkImport"
import Alert from "@/components/Alert"
import useDialog from "@/hooks/useDialog"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { TbPlus } from "react-icons/tb"
import BulkEntryRow from "./BulkEntryRow"
import Card from "@/components/Card"

type Props = {
  examinationTypes: ExaminationType[]
  qcItemParameters: QcItemParameter[]
  lots: InventoryLot[]
  item: Item
}

const emptyRow = () => ({
  lotNumber: '',
  examinationType: '',
  examinationTypeId: '',
  parameterResults: [] as any[],
})

const BulkEntryForm = ({ examinationTypes, qcItemParameters, lots, item }: Props) => {
  const { showDialog, resetDialogContext } = useDialog()
  const [errorContent, setErrorContent] = useState('')
  const router = useRouter()

  const form = useAppForm({
    defaultValues: {
      rows: [] as ReturnType<typeof emptyRow>[],
    },
    onSubmit: async ({ value }) => {
      const payload = value.rows.map(row => ({
        lotNumber: row.lotNumber,
        examinationTypeId: row.examinationTypeId,
        parameterResults: row.parameterResults.map((pr: any) => ({
          parameterId: pr.parameterId,
          parameterName: pr.parameterName,
          itemParameterId: pr.itemParameterId,
          value: pr.value,
          inputDefinitions: pr.inputDefinitions.map((def: any) => ({
            id: def.id,
            name: def.name,
            required: def.required,
            value: def.value,
          })),
        })),
      }))

      const result = await bulkImportQcRecords(payload, item.id)
      if (result.success) {
        router.back()
      } else {
        setErrorContent(result.message)
        showDialog('bulkEntryError')
      }
    },
  })

  return (
    <div className="flex flex-col gap-6">
      <Alert.Root identifier="bulkEntryError">
        <Alert.Content
          title="Import Failed"
          action={() => resetDialogContext()}
          actionLabel="Close"
          actionColor="warning"
        >
          {errorContent}
        </Alert.Content>
      </Alert.Root>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="flex flex-col gap-6"
      >
        <form.AppField name="rows" mode="array">
          {(field: any) => (
            <div className="flex flex-col gap-4">
              {field.state.value.map((_: any, i: number) => (
                <BulkEntryRow
                  key={i}
                  form={form}
                  index={i}
                  examinationTypes={examinationTypes}
                  lots={lots}
                  item={item}
                  qcItemParameters={qcItemParameters}
                />
              ))}
            </div>
          )}
        </form.AppField>

        <div className="flex gap-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => form.pushFieldValue('rows', emptyRow())}
          >
            <TbPlus className="size-4" />
            Add Row
          </button>

          <form.AppForm>
            <form.SubmitButton />
          </form.AppForm>

          <button
            type="button"
            className="btn btn-warning"
            onClick={() => router.back()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default BulkEntryForm
