'use client'

import { qualityActions } from "@/actions/quality"
import Dialog from "@/components/Dialog"
import Form from "@/components/Form"
import useDialog from "@/hooks/useDialog"
import { useForm } from "react-hook-form"

type Inputs = {
  name: string
  description: string
}
const TemplateFormDialog = () => {

  const form = useForm()
  const { resetDialogContext } = useDialog()

  const handleSubmit = async (data: Inputs) => {

    await qualityActions.qc.templates.create(data);
    resetDialogContext()
    location.reload();


  }
  return (
    <Dialog.Root identifier="newQcTemplate">

      <Dialog.Title>Add Template</Dialog.Title>


      <Form.Root form={form} onSubmit={handleSubmit}>

        <Form.Text form={form} fieldName="name" label="Name" required />
        <Form.TextArea form={form} fieldName="description" label="Description" required={false} />

        <Form.ActionRow form={form} />
      </Form.Root>

    </Dialog.Root>
  )
}

export default TemplateFormDialog
