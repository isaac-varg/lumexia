import { revalidatePage } from "@/actions/app/revalidatePage";
import supplierNoteActions from "@/actions/purchasing/supplierNoteActions";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import useDialog from "@/hooks/useDialog";
import { Supplier } from "@/types/supplier";
import React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  content: string;
};

const NotesForm = ({supplier }: {supplier: Supplier}) => {
  const form = useForm<Inputs>();
  const { resetDialogContext } = useDialog() 

  const handleSubmit = async(data: Inputs) => {
    await supplierNoteActions.createNew({supplierId: supplier.id, ...data})
    revalidatePage('/purchasing/supplier/[name]')
    resetDialogContext()
  }
  return (
    <Dialog.Root identifier="createNote">
      <Form.Root form={form} onSubmit={handleSubmit}>
        <Form.Text form={form} fieldName="content" label="Content" required />
      </Form.Root>
    </Dialog.Root>
  );
}

export default NotesForm;
