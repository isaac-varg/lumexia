'use client'
import Dialog from "@/components/Dialog"
import Form from "@/components/Form"
import useDialog from "@/hooks/useDialog"
import { useForm } from "react-hook-form"
import { updateFileName } from "../_actions/updateFileName"

type Inputs = { name: string };

const EditNameDialog = ({ fileId, currentName }: { fileId: string; currentName: string }) => {
  const { resetDialogContext } = useDialog();
  const form = useForm<Inputs>({ defaultValues: { name: currentName } });

  const handleSubmit = async (data: Inputs) => {
    await updateFileName(fileId, data.name);
    resetDialogContext();
  };

  return (
    <Dialog.Root identifier="editFileName">
      <Dialog.Title>Rename File</Dialog.Title>
      <Form.Root form={form} onSubmit={handleSubmit}>
        <Form.Text form={form} label="File Name" fieldName="name" required />
        <Form.ActionRow form={form} />
      </Form.Root>
    </Dialog.Root>
  );
};

export default EditNameDialog;
