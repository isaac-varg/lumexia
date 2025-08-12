import { revalidatePage } from "@/actions/app/revalidatePage";
import supplierContactNoteActions from "@/actions/purchasing/supplierContactNoteActions";
import ActionButton from "@/components/ActionButton";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import Layout from "@/components/Layout";
import useDialog from "@/hooks/useDialog";
import { SupplierContactNote } from "@/types/supplierContactNote";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import React from "react";
import { useForm } from "react-hook-form";
import { TbTrashX } from "react-icons/tb";

interface Inputs {
  content: string;
}

const EditNote = ({
  note,
  supplierId,
}: {
  note: SupplierContactNote;
  supplierId: string;
}) => {
  const form = useForm<Inputs>({ defaultValues: { content: note.content } });
  const { resetDialogContext } = useDialog();

  const handleSubmit = async (data: Inputs) => {
    const createData = {
      content: data.content,
    };

    const noteAddResponse = await supplierContactNoteActions.update(
      { id: note.id },
      createData,
    );

    createActivityLog("modifySupplierContactNote", "supplier", supplierId, {
      context: `Edited note: ${data.content}`,
      supplierContactNoteId: noteAddResponse.id,
      oldNote: note.content,
      newNote: data.content,
    });
    revalidatePage("/purchasing/suppliers/[name]");
    resetDialogContext();
  };

  const handleDelete = async () => {
    await supplierContactNoteActions.deleteOne({ id: note.id });

    createActivityLog("removeContactSupplierNote", "supplier", supplierId, {
      context: `Removed note: ${note.content}`,
    });
    revalidatePage("/purchasing/suppliers/[name]");
    resetDialogContext();
  };

  return (
    <Dialog.Root identifier={`addContactNote${note.id}`}>
      <Layout.Row justify="between">
	<Dialog.Title>Edit Note</Dialog.Title>
        <ActionButton color="warning" onClick={() => handleDelete()}>
          <TbTrashX className="text-xl" />
        </ActionButton>
      </Layout.Row>
      <Form.Root form={form} onSubmit={handleSubmit}>
        <Form.TextArea
          form={form}
          label="Note Content"
          fieldName="content"
          required
        />
        <Form.ActionRow form={form} />
      </Form.Root>
    </Dialog.Root>
  );
};

export default EditNote;
