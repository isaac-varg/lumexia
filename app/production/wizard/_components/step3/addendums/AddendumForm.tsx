import stepAddendumActions from "@/actions/production/stepAddendums"
import Dialog from "@/components/Dialog"
import Form from "@/components/Form"
import useDialog from "@/hooks/useDialog"
import useProductionWizard from "@/hooks/useProductionWizard"
import { StepAddendum } from "@/types/stepAddendum"
import { StepAddendumType } from "@/types/stepAddendumType"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { toProperCase } from "@/utils/data/toProperCase"
import { useForm } from "react-hook-form"

interface Inputs {
  addendumTypeId: string
  content: string
}


const AddendumForm = ({ addendum, stepAddendumTypes }: { addendum?: StepAddendum, stepAddendumTypes: StepAddendumType[] }) => {

  const form = useForm()
  const { selectedBatchStep,revalidate, selectedMbpr } = useProductionWizard()
  const { resetDialogContext } = useDialog()


  const handleSubmit = async (data: Inputs) => {
if (!selectedBatchStep) { throw new Error("Batch step not selected") }

    const { addendumTypeId, content } = data;
    const payload = {
      stepId: selectedBatchStep.id, 
      addendumTypeId,
      content,
    }


    const finish = (response: StepAddendum) => {

      if (!selectedBatchStep || !selectedMbpr) { throw new Error('Batch step not selected.') }

      createActivityLog('updatedBatchStep', 'mbprId', selectedMbpr?.id, { context: `Added equipment to batch step` })
      revalidate()
      resetDialogContext();

    }

    const response = await stepAddendumActions.createNew(payload)

    finish(response)




  }
  return (
    <Dialog.Root identifier="addNewAddendum">

      <Form.Root form={form} onSubmit={handleSubmit} >
        <Form.TextArea
          form={form}
          label="Content"
          fieldName="content"
          required
        />

        <Form.Select
          form={form}
          label="Addendum Type"
          options={stepAddendumTypes.map((type) => ({ value: type.id, label: toProperCase(type.name) }))}
          fieldName="addendumTypeId"
        />

        <Form.ActionRow form={form} />
      </Form.Root>
    </Dialog.Root>
  )
}

export default AddendumForm
